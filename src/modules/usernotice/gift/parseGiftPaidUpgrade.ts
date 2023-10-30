export interface GiftPaidUpgradeType {
  senderUsername: string,
  senderDisplayName: string,
  username: string
}

export const parseGiftPaidUpgrade = (fields: any) : GiftPaidUpgradeType => {
  const username = fields.login;

  return {
    senderUsername: fields["msg-param-sender-username"],
    senderDisplayName: fields["msg-param-sender-display-name"],
    username
  };
};
