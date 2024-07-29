import { parseEquals } from "@/modules/utils.js";
import { parseBan, BanInfoType } from "./parseBan";
import { parseTimeout, TimeoutInfoType } from "./parseTimeout";

export type ClearChatType = "clearchat" | "timeout" | "ban";

/**
 * El streamer o un moderador ha borrado todos los mensajes del canal
 */
export interface ClearChatInfoType {
  /** type - El tipo de evento, "clearchat" en este caso. */
  type: ClearChatType,
  /** roomId - Identificación numérica del canal en cuestión. */
  roomId: number,
  /** tmi - Timestamp del momento en que ocurre el evento. */
  tmi: number,
  /** raw - Información cruda del evento, directamente desde Twitch. */
  raw: string
}

type ClearChatGroupType = ClearChatInfoType | TimeoutInfoType | BanInfoType;

export const parseClearChat = ({ eventMessage } : any) : ClearChatGroupType => {
  // eslint-disable-next-line
  const [rawFields, host, rawType, channel, rawUsername] = eventMessage.substring(1).split(" ");
  const username = rawUsername?.substring(1) ?? "";
  const fields = parseEquals(rawFields);

  if (fields["ban-duration"]) {
    return {
      ...parseTimeout({ username, channel, ...fields }),
      raw: eventMessage
    };
  } else if (fields["target-user-id"]) {
    return {
      ...parseBan({ username, channel, ...fields }),
      raw: eventMessage
    };
  } else {
    return {
      type: "clearchat",
      roomId: Number(fields["room-id"]),
      tmi: Number(fields["tmi-sent-ts"]),
      raw: eventMessage
    };
  }
};
