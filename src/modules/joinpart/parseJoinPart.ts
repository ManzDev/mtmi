import { parseIRCHost } from "@/modules/utils.js";

type UserEventType = "join" | "part";

interface JoinPartType {
  type: UserEventType,
  username: string,
  channel: string,
  raw: string
}

export const parseJoinPart = ({ type, eventMessage }) : JoinPartType => {
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
