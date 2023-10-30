export interface AnnouncementType {
  color: string,
  roomId: number,
  systemMsg: string
}

export type AnnouncementInfoType = AnnouncementType | object;

export const parseAnnouncement = (fields : any) : AnnouncementInfoType => {
  if (fields.msgId !== "announcement") {
    return {};
  }

  const color = fields["msg-param-color"];

  return {
    color,
    roomId: Number(fields["room-id"]),
    systemMsg: fields["system-msg"]
  };
};
