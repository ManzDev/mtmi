import { parseIRCHost } from "@/modules/utils.js";

export type JoinPartType = "join" | "part";

export interface JoinPartInfoType {
  type: JoinPartType,
  username: string,
  channel: string,
  raw: string
}

export const parseJoinPart = ({ eventMessage } : any) : JoinPartInfoType => {
  // eslint-disable-next-line
  const [rawId, type, channel] = eventMessage.split(" ");
  const { username } = parseIRCHost(rawId);

  return {
    type: type.toLowerCase(),
    username,
    channel,
    raw: eventMessage
  };
};
