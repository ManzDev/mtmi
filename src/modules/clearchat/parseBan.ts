export interface BanType {
  roomId: number,
  targetUserId: number,
  tmi: number,
  channel: string,
  username: string
}

export const parseBan = (fields): BanType => {
  const { channel, username } = fields;

  return {
    roomId: Number(fields["room-id"]),
    targetUserId: Number(fields["target-user-id"]),
    tmi: Number(fields["tmi-sent-ts"]),
    channel,
    username
  };
};
