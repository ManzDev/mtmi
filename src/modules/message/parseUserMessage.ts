import { parsePrivMsg } from "./parsePrivMsg";
import { parseReplyMessage, ReplyInfoType } from "./parseReplyMessage";
import { parseBadges, BadgesType } from "./parseBadges";
import { BadgeInfoType, parseBadgeInfo } from "./parseBadgeInfo";
import { parseHypeChat, HypeChatInfoType } from "./parseHypeChat";
import { UserInfoType, parseUser } from "./parseUser";
import { MessageInfoType, parseMessage } from "./parseMessage";
import { parseBits, BitsGroupType } from "./parseBits";

export interface UserMessageInfoType {
  type: string,
  username: string,
  badges: BadgesType,
  badgeInfo: BadgeInfoType,
  userInfo: UserInfoType,
  messageInfo: MessageInfoType,
  replyInfo?: ReplyInfoType,
  hypeChatInfo?: HypeChatInfoType,
  bitsInfo?: BitsGroupType,
  raw: string
}

export const parseUserMessage = ({ eventMessage } : any): UserMessageInfoType => {
  const { fields, username, rawMessage, channel } = parsePrivMsg(eventMessage);

  const badges = parseBadges(fields.badges);
  const badgeInfo = parseBadgeInfo(fields["badge-info"]);
  const userInfo = parseUser({ username, ...fields });
  const messageInfo = parseMessage({ username, channel, rawMessage, ...fields });
  const replyInfo = parseReplyMessage(fields);
  const hypeChatInfo = parseHypeChat(fields);
  const bitsInfo = parseBits(fields);

  const newType = rawMessage.startsWith("\u0001ACTION ") ? "action" : "message";

  const data : UserMessageInfoType = {
    type: newType,
    username,
    badges,
    badgeInfo,
    userInfo,
    messageInfo,
    raw: eventMessage
  };

  Object.keys(replyInfo).length && (data.replyInfo = replyInfo);
  Object.keys(hypeChatInfo).length && (data.hypeChatInfo = hypeChatInfo);

  if (Object.keys(bitsInfo).length > 0) {
    return {
      ...data,
      bitsInfo,
      type: "bits"
    };
  }

  return data;
};
