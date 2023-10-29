import { parseEquals } from "@/modules/utils";
import { parseUser } from "@/modules/message/parseUser";
import { parseMessage } from "@/modules/message/parseMessage";
import { parseSub } from "@/modules/usernotice/sub/parseSub";
import { parseGift } from "@/modules/usernotice/parseGift";
import { parseRaid } from "@/modules/usernotice/parseRaid";

export const parseUserNotice = ({ type, eventMessage, timeStamp }) => {
  // eslint-disable-next-line
  const [rawFields, host, rawType, channel, ...rawMessage] = eventMessage.substring(1).split(" ");
  const fields = parseEquals(rawFields);
  const message = rawMessage.join(" ").substring(1);
  const username = fields.login;

  const userInfo = parseUser({ username, ...fields });
  const messageInfo = parseMessage({ username, channel, rawMessage: message, ...fields });
  const subInfo = parseSub(fields);
  const raidInfo = parseRaid(fields);
  const giftInfo = parseGift(fields);

  return {
    type: fields["msg-id"],
    channel,
    userInfo,
    messageInfo,
    message,
    subInfo,
    giftInfo,
    raidInfo,
    raw: eventMessage
  };

  // if (msgId === "announcement") { }
  /*
  const subData = parseSubscription(fields);

  return {
    ...eventData,
    type: msgId,
    message,
    messageWithEmotes: message,
    timeStamp,
    username: fields.login,
    subData
  };
  */
};
