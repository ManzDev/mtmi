import { cleanMessage } from "@/modules/utils";
import { parseSubPlan, SubPlanType } from "@/modules/usernotice/sub/parseSubPlan";

// Annonymous msg-param-fun-string=FunStringFive

export interface GiftInfoType {
  giftMonths: number,
  months: number,
  originId: string,
  recipientDisplayName: string,
  recipientId: number,
  recipientUserName: string,
  subPlan: SubPlanType
  senderCount?: number,
  funString?: string,
}

export const parseSubGift = (fields : any) : GiftInfoType => {
  const originId = cleanMessage(fields["msg-param-origin-id"]);
  const subPlan = parseSubPlan(fields);

  return {
    giftMonths: Number(fields["msg-param-gift-months"]),
    months: Number(fields["msg-param-months"]),
    originId,
    recipientDisplayName: fields["msg-param-recipient-display-name"],
    recipientId: Number(fields["msg-param-recipient-id"]),
    recipientUserName: fields["msg-param-recipient-user-name"],
    senderCount: Number(fields["msg-param-sender-count"]),
    subPlan
  };
};
