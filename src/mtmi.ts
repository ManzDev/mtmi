import type { EventTypeMap } from "./types.ts";
import type { CustomJsonApiConfig } from "./modules/message/avatars/getAvatar.ts";
import { setCustomApiFromJson } from "./modules/message/avatars/getAvatar.ts";
import { parseClearChat } from "@/modules/clearchat/parseClearChat.ts";
import { parseUserMessage } from "@/modules/message/parseUserMessage.ts";
import { parseJoinPart } from "@/modules/joinpart/parseJoinPart.ts";
import { parseClearMsg } from "@/modules/clearmsg/parseClearMsg.ts";
import { parseUserNotice } from "@/modules/usernotice/parseUserNotice.ts";
import { parseRawMessage } from "@/modules/parseRawMessage.ts";
import { parseNotice } from "@/modules/notice/parseNotice.ts";
import { parseRoomState } from "@/modules/roomstate/parseRoomState.ts";
import { debugId } from "@/debugId.ts";
import { chop } from "@/modules/utils.ts";

export interface OptionsObject {
  channels: Array<string>;
  secure: boolean;
  avatarProvider: string;
  badges: Array<BadgeJSONInfoType>;
  customApi: CustomJsonApiConfig;
  debug: boolean;
}

export interface BadgeJSONInfoType {
  /** Identificador del badge en formato "nombre/valor" (ej: "subscriber/12"). */
  text: string,
  /** Valor asociado al badge. */
  value: string | number,
  /** Imagen identificativa del badge. */
  image: string,
  /** Descripción del badge. */
  description: string
}

interface OnParametersType<T extends keyof EventTypeMap> {
  type: T;
  action: (data: EventTypeMap[T]) => void
}

const DOMAIN = "irc-ws.chat.twitch.tv";
const WEBSOCKET_URL = `ws://${DOMAIN}:80`;
const WEBSOCKET_SECURE_URL = `wss://${DOMAIN}:443`;
const USERNAME = "justinfan123";

class Client {
  #done = false;
  #startTime : number | undefined;   // eslint-disable-line
  #client : WebSocket | undefined;
  #events : Array<OnParametersType<any>> = [];
  channels : Array<string> = [];
  options : OptionsObject | undefined;
  badges : Array<BadgeJSONInfoType> = [];

  // Handlers
  #openHandler: () => void;
  #messageHandler: (e: MessageEvent) => void;
  #closeHandler: (e: CloseEvent) => void;

  constructor() {
    this.#openHandler = this.#open.bind(this);
    this.#messageHandler = this.#message.bind(this);
    this.#closeHandler = this.#close.bind(this);
  }

  connect(options: OptionsObject) {
    this.options = options;
    this.#done = false;
    this.#startTime = new Date().getTime();
    this.#client = (options.secure ?? true)
      ? new WebSocket(WEBSOCKET_SECURE_URL)
      : new WebSocket(WEBSOCKET_URL);
    this.channels = "channels" in options
      ? [...options.channels]
      : [];
    options.customApi && setCustomApiFromJson(options.customApi);
    !options.debug && (this.options.debug = true);
    if (options.badges) {
      client.badges = options.badges;
      options.debug && console.log(`${options.badges.length} badges cargados.`);
    };

    this.#client.addEventListener("open", this.#openHandler);
    this.#client.addEventListener("message", this.#messageHandler);
    this.#client.addEventListener("close", this.#closeHandler);
  }

  async isLive(channel) {
    const URL = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel}-150x100.jpg`;
    return await fetch(URL, { method: "HEAD" })
      .then(response => !response.url.includes("/404_preview"));
  }

  #open() {
    this.options?.debug && console.log("Conectado a Twitch.");

    this.#client?.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
    this.#client?.send(`NICK ${USERNAME}`);
    this.channels.forEach(channel =>
      this.#client?.send(`JOIN #${channel}`)
    );
  }

  on<T extends keyof EventTypeMap>(type: T, action: (data: EventTypeMap[T]) => void): void {
    const object : OnParametersType<T> = { type, action };
    this.#events.push(object as OnParametersType<any>);
  }

  #message(event : any) {
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
        !this.#done && console.log(eventMessage);
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

    this.#done = true;

    this.#events
      .filter(({ type }) => type === eventType)
      .forEach(({ action }) => action(eventData));

    // console.log("->", eventData);
  }

  pong() {
    this.#client?.send("PONG :tmi.twitch.tv");
    this.options?.debug && console.log("PONG :tmi.twitch.tv");
  }

  close() {
    this.#client?.removeEventListener("open", this.#openHandler);
    this.#client?.removeEventListener("message", this.#messageHandler);
    this.#client?.removeEventListener("close", this.#closeHandler);
    this.#client?.close();
  }

  #close(event : any) {
    const { type, reason, code } = event;
    this.options?.debug && console.log(`${type}: REASON ${reason} ${code}`);
    this.close();

    if (code === 1006) {
      console.log("Reconnectando en 5 segundos...");
      setTimeout(() => this.options && this.connect(this.options), 5000);
    }
  }
}

export const client = new Client();
