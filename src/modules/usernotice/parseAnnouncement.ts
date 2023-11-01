export interface AnnouncementInfoType {
  color: string,
  roomId: number,
  systemMsg: string
}

export type AnnouncementGroupType = AnnouncementInfoType | object;

export const parseAnnouncement = (fields : any) : AnnouncementGroupType => {
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
