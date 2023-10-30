import { parseMessageWithEmotes } from "./emotes/parseMessageWithEmotes";
import { parseFlags, FlagsType } from "./parseFlags";

export interface MessageInfoType {
  id: string,
  isFirstMessage: boolean,
  isReturningChatter: boolean,
  isEmoteOnly: boolean,
  isHighlightedMessage: boolean,
  flagsInfo?: FlagsType,
  roomId: number,
  channel: string,
  userId: number,
  username: string,
  tmi: number,
  rawMessage: string,
  message: string
}

export const parseMessage = (fields: any) : MessageInfoType => {
  const { username, channel, flags, rawMessage } = fields;
  const message = parseMessageWithEmotes({ rawMessage, ...fields });
  const flagsInfo = parseFlags({ flags, rawMessage });

  return {
    id: fields.id,
    isEmoteOnly: Boolean(fields["emote-only"]),
    isFirstMessage: Boolean(fields["first-msg"]),
    isReturningChatter: Boolean(fields["returning-chatter"]),
    isHighlightedMessage: fields["msg-id"] === "highlighted-message",
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
