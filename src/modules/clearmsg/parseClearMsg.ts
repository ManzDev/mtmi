import { parseEquals } from "@/modules/utils";

interface ClearMsgInfoType {
  username: string,
  roomId: number,
  type: string,
  tmi: number,
  channel: string,
  message: string
}

export const parseClearMsg = ({ eventMessage } : any) : ClearMsgInfoType => {
  // eslint-disable-next-line
  const [rawFields, host, rawType, channel, ...rawMessage] = eventMessage.split(" ");
  const message = rawMessage.join(" ").substring(1);
  const fields = parseEquals(rawFields.substring(1));

  return {
    username: fields.login,
    roomId: fields["room-id"],
    type: fields["msg-id"],
    tmi: fields["tmi-sent-ts"],
    channel,
    message
  };
};
