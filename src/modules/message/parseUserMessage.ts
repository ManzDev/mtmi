import { parsePrivMsg } from "./parsePrivMsg";
import { parseReplyMessage, ReplyInfoType } from "./parseReplyMessage";
import { parseBadges, BadgesType } from "./parseBadges";
import { BadgeInfoType, parseBadgeInfo } from "./parseBadgeInfo";
import { parseHypeChat, HypeChatInfoType } from "./parseHypeChat";
import { UserInfoType, parseUser } from "./parseUser";
import { MessageInfoType, parseMessage } from "./parseMessage";
import { parseBits, BitsInfoType } from "./parseBits";

interface UserMessageType {
  type: string,
  username: string,
  badges: BadgesType,
  badgeInfo: BadgeInfoType,
  userInfo: UserInfoType,
  messageInfo: MessageInfoType,
  replyInfo?: ReplyInfoType,
  hypeChatInfo?: HypeChatInfoType,
  bitsInfo?: BitsInfoType,
  raw: string,
  timeStamp: number
}

export const parseUserMessage = ({ eventMessage, timeStamp } : any): UserMessageType => {
  const { fields, username, rawMessage, channel } = parsePrivMsg(eventMessage);

  const badges = parseBadges(fields.badges);
  const badgeInfo = parseBadgeInfo(fields["badge-info"]);
  const userInfo = parseUser({ username, ...fields });
  const messageInfo = parseMessage({ username, channel, rawMessage, ...fields });
  const replyInfo = parseReplyMessage(fields);
  const hypeChatInfo = parseHypeChat(fields);
  const bitsInfo = parseBits(fields);

  const newType = rawMessage.startsWith("\u0001ACTION ") ? "action" : "message";

  const data : UserMessageType = {
    type: newType,
    username,
    badges,
    badgeInfo,
    userInfo,
    messageInfo,
    raw: eventMessage,
    timeStamp
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
