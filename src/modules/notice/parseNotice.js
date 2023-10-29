// "@msg-id=emote_only_off :tmi.twitch.tv NOTICE #chrisvdev :This room is no longer in emote-only mode."

import { parseEquals } from "@/modules/utils.js";

export const parseNotice = ({ type, eventMessage, timeStamp }) => {
  const [options, host, id, channel] = eventMessage.split(" ", 4);

  const data = parseEquals(options.substring(1));
  const message = eventMessage.split(" ").slice(4).join(" ").substring(1);
  const noticeType = data["msg-id"] ? data["msg-id"] : "notice";

  return {
    ...data,
    message,
    type: noticeType
  };
};
