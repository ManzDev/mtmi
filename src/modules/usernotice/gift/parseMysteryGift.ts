import { cleanMessage } from "@/modules/utils";

export interface MysteryGiftInfoType {
  massGiftCount: number, // Regaladas
  originId: string,
  senderCount: number, // Total acumulado
  senderUsername: string
  subPlan: string,
  systemMsg: string,
}

/**
 * El usuario @senderUsername regala @massGiftCount subs a la comunidad.
 */
export const parseMysteryGift = (fields: any) : MysteryGiftInfoType => {
  const originId = cleanMessage(fields["msg-param-origin-id"]);

  return {
    massGiftCount: Number(fields["msg-param-mass-gift-count"]),
    originId,
    senderCount: Number(fields["msg-param-sender-count"]),
    senderUsername: fields.login,
    subPlan: fields["msg-param-sub-plan"],
    systemMsg: cleanMessage(fields["system-msg"])
  };
};
