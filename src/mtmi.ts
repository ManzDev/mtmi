import { EventTypeMap } from "./types";
import { parseClearChat } from "@/modules/clearchat/parseClearChat";
import { parseUserMessage } from "@/modules/message/parseUserMessage";
import { parseJoinPart } from "@/modules/joinpart/parseJoinPart";
import { parseClearMsg } from "@/modules/clearmsg/parseClearMsg";
import { parseUserNotice } from "@/modules/usernotice/parseUserNotice";
import { parseRawMessage } from "@/modules/parseRawMessage";
import { parseNotice } from "@/modules/notice/parseNotice";
import { parseRoomState } from "@/modules/roomstate/parseRoomState";
import { debugId } from "@/debugId";
import { chop } from "@/modules/utils";

interface OptionsObject {
  channels: Array<String>
}

const WEBSOCKET_URL = "ws://irc-ws.chat.twitch.tv:80";
const USERNAME = "justinfan123";
const DEBUG = true;

class Client {
  channels : Array<String> = [];
  client : WebSocket | undefined;
  startTime: Number | undefined;
  events : Array<{ type: keyof EventTypeMap, action: (data: EventTypeMap) => any }> = [];
  done = false;
  options: OptionsObject | undefined;

  connect(options: OptionsObject) {
    this.options = options;
    this.client = new WebSocket(WEBSOCKET_URL);
    this.startTime = new Date().getTime();
    this.channels.push(...options.channels);

    this.client.addEventListener("open", (event) => this.open(event));
    this.client.addEventListener("message", (event) => this.message(event));
    this.client.addEventListener("close", (event) => this.close(event));
  }

  open(event : any) {
    DEBUG && console.log(`Conectado a Twitch: ${event.target.url}`);

    this.client?.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
    this.client?.send(`NICK ${USERNAME}`);
    this.channels.forEach(channel => this.client?.send(`JOIN #${channel}`));
  }

  on<T extends keyof EventTypeMap>(type: T, action: (data: EventTypeMap[T]) => void): void {
    const object : any = { type, action };
    this.events.push(object);
  }

  message(event : any) {
    const data = chop(event.data);

    // PING-PONG
    if (data === "PING :tmi.twitch.tv") {
      this.pong();
      return;
    }

    const eventMessages : Array<any> = data.split("\r\n");

    eventMessages.forEach(eventMessage => {
      const type = eventMessage.split("tmi.twitch.tv ").at(1).split(" ").at(0);

      debugId(eventMessage);

      // EVENT-CONTROL
      switch (type) {
      case "PRIVMSG":
        this.#manageEvent(parseUserMessage({ eventMessage: data }));
        break;
      case "JOIN":
        this.#manageEvent(parseJoinPart({ eventMessage }));
        break;
      case "PART":
        this.#manageEvent(parseJoinPart({ eventMessage }));
        break;
      case "CLEARCHAT":
        this.#manageEvent(parseClearChat({ eventMessage }));
        break;
      case "CLEARMSG":
        this.#manageEvent(parseClearMsg({ eventMessage }));
        break;
      case "ROOMSTATE":
        this.#manageEvent(parseRoomState({ eventMessage }));
        break;
      case "NOTICE":
        this.#manageEvent(parseNotice({ eventMessage }));
        break;
      case "USERNOTICE":
        this.#manageEvent(parseUserNotice({ eventMessage }));
        break;
      /*
      case "GLOBALUSERSTATE":
        console.log("----> GLOBALUSERSTATE: ", eventMessage);
        break;
      case "USERSTATE":
        console.log("----> USERSTATE: ", eventMessage);
        break;
      case "RECONNECT":
        console.log("----> RECONNECT: ", eventMessage);
        break;
      */
      case "CAP": // CAP: Connect
      case "001": // 001: Welcome
      case "002": // 002: Host
      case "003": // 003: Server
      case "004": // 004: ?
      case "372": // 372: Egg Easter
      case "375": // 375: ?
      case "376": // 376: ?
      case "353": // 353: NAMES IRC
      case "366": // 366: /NAMES IRC
      case "421": // 421: ?
        // Ignore
        break;
      default:
        !this.done && console.log(eventMessage);
        this.#manageEvent(parseRawMessage({ eventMessage }));
        break;
      }
    });
  }

  #manageEvent(eventData : any) {
    const eventType = eventData.type;

    // Ignore own username
    if (["join", "part"].includes(eventType) && eventData.username && eventData.username.startsWith("justinfan")) {
      return;
    }

    this.done = true;

    this.events
      .filter(({ type }) => type === eventType)
      .forEach(({ action }) => action(eventData));

    // console.log("->", eventData);
  }

  pong() {
    this.client?.send("PONG :tmi.twitch.tv");
    DEBUG && console.log("PONG :tmi.twitch.tv");
  }

  close(event : any) {
    const { type, reason, code } = event;
    DEBUG && console.log(`${type}: REASON ${reason} ${code}`);

    if (code === 1006) {
      console.log("Reconnectando en 5 segundos...");
      setTimeout(() => this.options && this.connect(this.options), 5000);
    }
  }
}

export const client = new Client();
