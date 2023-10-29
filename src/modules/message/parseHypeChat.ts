export interface HypeChatType {
  amount: number,
  currency: string,
  exponent: number,
  level: string,
  isSystemMessage: boolean
}

type HypeChatMessage = HypeChatType | null;

export const parseHypeChat = (fields) : HypeChatMessage => {
  // Es un mensaje de hype chat
  const isHypeChat = Boolean(fields["pinned-chat-paid-amount"]);
  if (!isHypeChat) {
    return null;
  }

  const hypeChat : HypeChatType = {
    amount: Number(fields["pinned-chat-paid-amount"]),
    currency: fields["pinned-chat-paid-currency"],
    exponent: Number(fields["pinned-chat-paid-exponent"]),
    level: fields["pinned-chat-paid-level"],
    isSystemMessage: fields["pinned-chat-paid-is-system-message"] !== "0",
  };

  console.log("----> ", hypeChat);

  return {
    ...hypeChat
  };
};
