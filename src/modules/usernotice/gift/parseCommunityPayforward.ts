import { cleanMessage } from "@/modules/utils";

export interface CommunityPayforwardInfoType {
  gifterAnonymous: boolean,
  gifterId: number,
  gifterUserName: string,
  gifterDisplayName: string,
  systemMsg: string,
}

export const parseCommunityPayforward = (fields: any) : CommunityPayforwardInfoType => {
  const gifterAnonymous = fields["msg-param-prior-gifter-anonymous"] !== "false";

  return {
    gifterAnonymous,
    gifterId: Number(fields["msg-param-prior-gifter-id"]),
    gifterUserName: fields["msg-param-prior-gifter-user-name"],
    gifterDisplayName: fields["msg-param-prior-gifter-display-name"],
    systemMsg: cleanMessage(fields["system-msg"])
  };
};
