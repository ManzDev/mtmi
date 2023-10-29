import { cleanMessage } from "@/modules/utils";

export interface MysteryGiftType {
  massGiftCount: number,
  originId: string,
  senderCount: number,
  subPlan: string
}

export const parseMysteryGift = (fields) : MysteryGiftType => {
  const originId = cleanMessage(fields["msg-param-origin-id"]);

  return {
    massGiftCount: Number(fields["msg-param-mass-gift-count"]),
    originId,
    senderCount: Number(fields["msg-param-sender-count"]),
    subPlan: fields["msg-param-sub-plan"]
  };
};
