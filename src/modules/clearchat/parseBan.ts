/**
 * El streamer o un moderador ha baneado permanentemente (permaban) a un usuario.
 */
export interface BanInfoType {
  type: string,
  /** roomId - Identificación numérica del canal en cuestión. */
  roomId: number,
  /** targetUserId -  */
  targetUserId: number,
  /** tmi - Timestamp del momento en que ocurre el evento. */
  tmi: number,
  channel: string,
  username: string,
  raw: any
}

export const parseBan = (fields : any): BanInfoType => {
  const { channel, username } = fields;

  return {
    type: "ban",
    roomId: Number(fields["room-id"]),
    targetUserId: Number(fields["target-user-id"]),
    tmi: Number(fields["tmi-sent-ts"]),
    channel,
    username,
    raw: fields
  };
};
