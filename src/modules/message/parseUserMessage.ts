import { parsePrivMsg } from "./parsePrivMsg";
import { parseReplyMessage } from "./parseReplyMessage";
import { parseBadges } from "./parseBadges";
import { parseBadgeInfo } from "./parseBadgeInfo";
import { parseHypeChat } from "./parseHypeChat";
import { parseUser } from "./parseUser";
import { parseMessage } from "./parseMessage";

export const parseUserMessage = ({ type, eventMessage, timeStamp }) => {
  const { fields, username, rawMessage, channel } = parsePrivMsg(eventMessage);

  const badges = parseBadges(fields.badges);
  const badgeInfo = parseBadgeInfo(fields["badge-info"]);
  const userInfo = parseUser({ username, ...fields });
  const replyInfo = parseReplyMessage(fields);
  const hypeChatInfo = parseHypeChat(fields);
  const messageInfo = parseMessage({ username, channel, rawMessage, ...fields });

  const newType = rawMessage.startsWith("\u0001ACTION ") ? "action" : type;
  // Object.keys(badgeInfo).includes("predictions") && console.log(badges, badgeInfo, eventMessage);

  return {
    type: newType,
    username,
    badges,
    badgeInfo,
    userInfo,
    messageInfo,
    replyInfo,
    hypeChatInfo,
    raw: eventMessage
  };
};
