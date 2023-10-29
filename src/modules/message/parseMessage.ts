import { parseMessageWithEmotes } from "./parseMessageWithEmotes";
import { parseFlags, FlagsType } from "./parseFlags";

interface MessageType {
  id: string,
  isFirstMessage: boolean,
  isReturningChatter: boolean,
  isEmoteOnly: boolean,
  flagsInfo?: FlagsType,
  roomId: number,
  channel: string,
  userId: number,
  username: string,
  tmi: number,
  rawMessage: string,
  message: string
}

export const parseMessage = (fields) : MessageType => {
  const { username, channel, flags, rawMessage } = fields;
  const message = parseMessageWithEmotes({ rawMessage, ...fields });
  const flagsInfo = parseFlags({ flags, rawMessage });

  return {
    id: fields.id,
    isEmoteOnly: Boolean(fields["emote-only"]),
    isFirstMessage: Boolean(fields["first-msg"]),
    isReturningChatter: Boolean(fields["returning-chatter"]),
    flagsInfo,
    roomId: fields["room-id"],
    channel,
    tmi: fields["tmi-sent-ts"],
    userId: fields["user-id"],
    username,
    message,
    rawMessage,
  };
};
