import { parsePrivMsg } from "./parsePrivMsg";
import { parseReplyMessage, ReplyInfoType } from "./parseReplyMessage";
import { parseBadges } from "./parseBadges";
import { UserInfoType, parseUser } from "./parseUser";
import { MessageInfoType, parseMessage } from "./parseMessage";
import { parseBits, BitsGroupType } from "./parseBits";
import { BadgeInfoType } from "./badges/parseBadgeInfo";

export interface UserMessageInfoType {
  type: string,
  username: string,
  channel: string,
  message: string,
  badges: Array<BadgeInfoType>,
  userInfo: UserInfoType,
  messageInfo: MessageInfoType,
  replyInfo?: ReplyInfoType,
  bitsInfo?: BitsGroupType,
  raw: string
}

export const parseUserMessage = ({ eventMessage } : any): UserMessageInfoType => {
  const { fields, username, rawMessage, channel } = parsePrivMsg(eventMessage);

  const badges = parseBadges(fields);
  const userInfo = parseUser({ username, ...fields });
  const messageInfo = parseMessage({ username, channel, rawMessage, ...fields });
  const replyInfo = parseReplyMessage(fields);
  const bitsInfo = parseBits(fields);

  const newType = rawMessage.startsWith("\u0001ACTION ") ? "action" : "message";

  const data : UserMessageInfoType = {
    type: newType,
    username,
    badges,
    userInfo,
    messageInfo,
    message: rawMessage,
    channel,
    raw: eventMessage
  };

  Object.keys(replyInfo).length && (data.replyInfo = replyInfo);

  if (Object.keys(bitsInfo).length > 0) {
    return {
      ...data,
      bitsInfo,
      type: "bits"
    };
  }

  return data;
};
