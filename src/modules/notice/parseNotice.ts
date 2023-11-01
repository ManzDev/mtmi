import { parseEquals } from "@/modules/utils.js";

export type NoticeGroupType =
  "emote_only_off" | "emote_only_on" |
  "followers_on" | "followers_off" |
  "slow_on" | "slow_off" |
  "subs_on" | "subs_off" |
  "r9k_on" | "r9k_off";

interface NoticeInfoType {
  type: NoticeGroupType,
  channel: string,
  message: string
}

export const parseNotice = ({ eventMessage } : any) : NoticeInfoType => {
  // eslint-disable-next-line
  const [rawFields, host, rawType, channel, ...rawMessage] = eventMessage.substring(1).split(" ");
  const fields = parseEquals(rawFields);
  const message = rawMessage.join(" ").substring(1);
  const type = fields["msg-id"] ?? "notice";

  return {
    type,
    channel,
    message,
  };
};
