import { cleanMessage } from "@/modules/utils";

export interface GiftType {
  giftMonths: number,
  months: number,
  originId: string,
  recipientDisplayName: string,
  recipientId: number,
  recipientUsername: string,
  senderCount: number,
  subPlanName: string,
  subPlan: string
}

export const parseSubGift = (fields) : GiftType => {
  const originId = cleanMessage(fields["msg-param-origin-id"]);

  return {
    giftMonths: Number(fields["msg-param-gift-months"]),
    months: Number(fields["msg-param-months"]),
    originId,
    recipientDisplayName: fields["msg-param-display-name"],
    recipientId: Number(fields["msg-param-recipient-id"]),
    recipientUsername: fields["msg-param-recipient-username"],
    senderCount: Number(fields["msg-param-sender-count"]),
    subPlan: fields["msg-param-sub-plan"],
    subPlanName: cleanMessage(fields["msg-param-sub-plan-name"])
  };
};
