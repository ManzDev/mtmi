import { parseEquals } from "@/modules/utils";

interface ClearMsgType {
  username: string,
  roomId: number,
  msgId: number,
  tmi: number,
  channel: string,
  message: string
}

export const parseClearMsg = ({ type, eventMessage }) => {
  // eslint-disable-next-line
  const [rawFields, host, rawType, channel, ...rawMessage] = eventMessage.split(" ");
  const message = rawMessage.substring(1);
  const fields = parseEquals(rawFields.substring(1));

  const clearMsg : ClearMsgType = {
    username: fields.login,
    roomId: fields["room-id"],
    msgId: fields["msg-id"],
    tmi: fields["tmi-sent-ts"],
    channel,
    message
  };

  return {
    ...clearMsg,
    type
  };
};
