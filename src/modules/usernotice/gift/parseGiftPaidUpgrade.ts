import { cleanMessage } from "@/modules/utils";

export interface GiftPaidUpgradeInfoType {
  type: string,
  senderUsername: string,
  senderDisplayName: string,
  systemMsg: string,
  username: string,
  displayName: string
}

export const parseGiftPaidUpgrade = (fields: any) : GiftPaidUpgradeInfoType => {
  const username = fields.login;

  return {
    type: fields["msg-id"],
    senderUsername: fields["msg-param-sender-username"],
    senderDisplayName: fields["msg-param-sender-display-name"],
    systemMsg: cleanMessage(fields["system-msg"]),
    username,
    displayName: fields["display-name"]
  };
};
