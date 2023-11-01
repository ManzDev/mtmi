import { parseEquals } from "@/modules/utils";
import { parseUser, UserInfoType } from "@/modules/message/parseUser";
import { parseMessage, MessageInfoType } from "@/modules/message/parseMessage";
import { parseSub, SubInfoOptionalType } from "@/modules/usernotice/sub/parseSub";
import { parseGift, GiftGroupType } from "@/modules/usernotice/parseGift";
import { parseRaid, RaidGroupType } from "@/modules/usernotice/parseRaid";
import { parseAnnouncement, AnnouncementInfoType } from "@/modules/usernotice/parseAnnouncement";

interface UserNoticeInfoType {
  type: string,
  channel: string,
  userInfo: UserInfoType,
  messageInfo: MessageInfoType,
  message: string,
  raw: string,
  timeStamp: number,
  subInfo?: SubInfoOptionalType,
  giftInfo?: GiftGroupType,
  raidInfo?: RaidGroupType,
  announcementInfo?: AnnouncementInfoType
}

export const parseUserNotice = ({ eventMessage, timeStamp } : any) : UserNoticeInfoType => {
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
  const announcementInfo = parseAnnouncement(fields);

  const data : UserNoticeInfoType = {
    type: fields["msg-id"],
    channel,
    userInfo,
    messageInfo,
    message,
    raw: eventMessage,
    timeStamp
  };

  Object.keys(subInfo).length && (data.subInfo = subInfo);
  Object.keys(giftInfo).length && (data.giftInfo = giftInfo);
  Object.keys(raidInfo).length && (data.raidInfo = raidInfo);
  Object.keys(announcementInfo).length && (data.announcementInfo = announcementInfo);

  return data;
};
