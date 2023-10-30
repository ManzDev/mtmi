import { parseIRCHost } from "@/modules/utils.js";

export type JoinPartType = "join" | "part";

interface UserJoinPartType {
  type: JoinPartType,
  username: string,
  channel: string,
  raw: string
}

export const parseJoinPart = ({ type, eventMessage } : any) : UserJoinPartType => {
  // eslint-disable-next-line
  const [rawId, rawType, channel] = eventMessage.split(" ");
  const { username } = parseIRCHost(rawId);

  return {
    type,
    username,
    channel,
    raw: eventMessage
  };
};
