import { parseEquals } from "@/modules/utils.js";
import { parseBan, BanInfoType } from "./parseBan";
import { parseTimeout, TimeoutInfoType } from "./parseTimeout";

export type ClearChatType = "clearchat" | "timeout" | "ban";

export interface ClearChatInfoType {
  /**
   * El tipo de evento, "clearchat" en este caso.
   *
   * @default "Hello!"
   */
  type: ClearChatType,
  /**
   * Identificación numérica del canal en cuestión.
   */
  roomId: number,
  /**
   * Timestamp del momento en que ocurre el evento.
   */
  tmi: number,
  /**
   * Información cruda del evento, directamente desde Twitch.
   */
  raw: string
}

type ClearChatGroupType = ClearChatInfoType | TimeoutInfoType | BanInfoType;

export const parseClearChat = ({ eventMessage } : any) : ClearChatGroupType => {
  // eslint-disable-next-line
  const [rawFields, host, rawType, channel, rawUsername] = eventMessage.substring(1).split(" ");
  const username = rawUsername?.substring(1) ?? "";
  const fields = parseEquals(rawFields);

  // timeout
  if (fields["ban-duration"]) {
    return {
      type: "timeout",
      ...parseTimeout({ username, channel, ...fields }),
      raw: eventMessage,
    };
  }

  // ban
  if (fields["target-user-id"]) {
    return {
      type: "ban",
      ...parseBan({ username, channel, ...fields }),
      raw: eventMessage,
    };
  }

  // clearchat
  return {
    type: "clearchat",
    roomId: Number(fields["room-id"]),
    tmi: Number(fields["tmi-sent-ts"]),
    raw: eventMessage,
  };
};
