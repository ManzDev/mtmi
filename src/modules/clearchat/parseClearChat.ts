import { parseEquals } from "@/modules/utils.js";
import { parseBan, BanType } from "./parseBan";
import { parseTimeout, TimeoutType } from "./parseTimeout";

type EventType = "clearchat" | "timeout" | "ban";

interface ClearChatType {
  roomId: number,
  timeStamp: number,
  tmi: number,
  type: EventType
}

type ClearChatEventType = ClearChatType | TimeoutType | BanType;

export const parseClearChat = ({ eventMessage, timeStamp }) : ClearChatEventType => {
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
      timeStamp
    };
  }

  // ban
  if (fields["target-user-id"]) {
    return {
      type: "ban",
      ...parseBan({ username, channel, ...fields }),
      raw: eventMessage,
      timeStamp
    };
  }

  // clearchat
  return {
    type: "clearchat",
    roomId: Number(fields["room-id"]),
    tmi: Number(fields["tmi-sent-ts"]),
    raw: eventMessage,
    timeStamp
  };
};
