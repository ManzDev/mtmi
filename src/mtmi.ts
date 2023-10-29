import { Ban } from "@/modules/clearchat/parseBan";
import { Timeout } from "@/modules/clearchat/parseTimeout";

import { parseUserMessage } from "@/modules/message/parseUserMessage";
import { parseJoinPart } from "@/modules/joinpart/parseJoinPart";
import { parseClearChat } from "@/modules/clearchat/parseClearChat";
import { parseClearMsg } from "@/modules/clearmsg/parseClearMsg";
import { parseUserNotice } from "@/modules/usernotice/parseUserNotice";
import { parseRawMessage } from "@/modules/parseRawMessage";
import { parseNotice } from "@/modules/notice/parseNotice";
import { parseRoomState } from "@/modules/roomstate/parseRoomState";
import { chop } from "@/modules/utils";

type EventType =
  "join" | "part" |
  "sub" | "resub" | "extendsub" |
  "subgift" | "submysterygift" |
  "communitypayforward" | "standardpayforward" |
  "giftpaidupgrade" | "primepaidupgrade" |
  "rewardgift" | "anonsubgift" | "anongiftpaidupgrade" |
  "bits" | "bitsbadgetier" | "charity" |
  "ritual" |
  "ban" | "timeout" |
  "clearmsg" |
  "raid" | "unraid" |
  "notice" | "usernotice" |
  "roomstate" |
  "announcement" |
  "raw" |
  "message" | "action";

interface EventTypeAction {
  type: EventType,
  action: Function
}

type EventTypeMap = {
  ban: Ban,
  timeout: Timeout,
}

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
  events = [];
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

  open(event) {
    DEBUG && console.log(`Conectado a Twitch: ${event.target.url}`);

    this.client?.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
    this.client?.send(`NICK ${USERNAME}`);
    this.client?.send(`JOIN #${this.channels.at(0)}`);
  }

  on<T extends EventType>(type: T, action: (data: EventTypeMap[T]) => any) {
    const object = { type, action };
    this.events.push(object);
  }

  message(event) {
    const { timeStamp } = event;
    const data = chop(event.data);

    // PING-PONG
    if (data === "PING :tmi.twitch.tv") {
      this.pong();
      return;
    }

    const eventMessages = data.split("\r\n");

    eventMessages.forEach(eventMessage => {
      const type = eventMessage.split("tmi.twitch.tv ").at(1).split(" ").at(0);

      // EVENT-CONTROL
      switch (type) {
      case "PRIVMSG":
        this.manageEvent(parseUserMessage({ type: "message", eventMessage: data, timeStamp }));
        break;
      case "JOIN":
        this.manageEvent(parseJoinPart({ type: "join", eventMessage }));
        break;
      case "PART":
        this.manageEvent(parseJoinPart({ type: "part", eventMessage }));
        break;
      case "CLEARCHAT":
        this.manageEvent(parseClearChat({ eventMessage, timeStamp }));
        break;
      case "CLEARMSG":
        this.manageEvent(parseClearMsg({ type: "clearmsg", eventMessage }));
        break;
      case "ROOMSTATE":
        this.manageEvent(parseRoomState({ type: "roomstate", eventMessage, timeStamp }));
        break;
      case "NOTICE":
        this.manageEvent(parseNotice({ type: "notice", eventMessage, timeStamp }));
        break;
      case "USERNOTICE":
        this.manageEvent(parseUserNotice({ type: "usernotice", eventMessage, timeStamp }));
        break;
      case "GLOBALUSERSTATE":
        console.log("----> GLOBALUSERSTATE: ", eventMessage);
        break;
      case "USERSTATE":
        console.log("----> USERSTATE: ", eventMessage);
        break;
      case "RECONNECT":
        console.log("----> RECONNECT: ", eventMessage);
        break;
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
        this.manageEvent(parseRawMessage({ type: "raw", eventMessage, timeStamp }));
        break;
      }
    });
  }

  manageEvent(eventData) {
    const eventType = eventData.type;

    // FILTERS TEMP

    const FILTER = [
      "message", "action",
      "timeout", "ban",
      // "clearmsg",
      // "sub", "resub",
      // "roomstate",
      // "subgift", "submysterygift",
      // "raid"
    ];
    if (FILTER.includes(eventType)) {
      return;
    }

    // Ignore own username
    if ((eventType === "join" || eventType === "part") && eventData.username && eventData.username.startsWith("justinfan")) {
      return;
    }

    this.done = true;

    this.events
      .filter(({ type }) => type === eventType)
      .forEach(({ type, action }) => action(eventData));

    // console.log(eventData);
  }

  pong() {
    this.client?.send("PONG :tmi.twitch.tv");
    DEBUG && console.log("PONG :tmi.twitch.tv");
  }

  close(event) {
    const { type, reason, code } = event;
    DEBUG && console.log(`${type}: REASON ${reason} ${code}`);

    if (code === 1006) {
      console.log("Reconnectando en 5 segundos...");
      setTimeout(() => this.connect(this.options), 5000);
    }
  }
}

export const client = new Client();
