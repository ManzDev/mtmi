import { cleanMessage } from "@/modules/utils";

export interface MysteryGiftInfoType {
  massGiftCount: number, // Regaladas
  originId: string,
  isAnonymous: boolean,
  senderUsername: string
  subPlan: string,
  systemMsg: string,
  senderCount?: number, // Total acumulado
}

/**
 * El usuario senderUsername regala massGiftCount subs a la comunidad.
 */
export const parseMysteryGift = (fields: any) : MysteryGiftInfoType => {
  const originId = cleanMessage(fields["msg-param-origin-id"]);

  const data = {
    massGiftCount: Number(fields["msg-param-mass-gift-count"]),
    originId,
    senderCount: Number(fields["msg-param-sender-count"]),
    senderUsername: fields.login,
    isAnonymous: fields.login === "ananonymousgifter",
    subPlan: fields["msg-param-sub-plan"],
    systemMsg: cleanMessage(fields["system-msg"])
  };

  fields["msg-param-sender-count"] && (data.senderCount = Number(fields["msg-param-sender-count"]));

  return data;
};
