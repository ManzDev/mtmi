export interface StandardPayforwardType {
  gifterAnonymous: boolean,
  gifterId: number,
  gifterUserName: string,
  gifterDisplayName: string,
  recipientId: number,
  recipientUserName: string
  recipientDisplayName: string,
}

export const parseStandardPayforward = (fields) : StandardPayforwardType => {
  const gifterAnonymous = fields["msg-param-prior-gifter-anonymous"] !== "false";

  return {
    gifterAnonymous,
    gifterId: Number(fields["msg-param-prior-gifter-id"]),
    gifterUserName: fields["msg-param-prior-gifter-user-name"],
    gifterDisplayName: fields["msg-param-prior-gifter-display-name"],
    recipientId: Number(fields["msg-param-recipient-id"]),
    recipientUserName: fields["msg-param-recipient-user-name"],
    recipientDisplayName: fields["msg-param-recipient-display-name"]
  };
};
