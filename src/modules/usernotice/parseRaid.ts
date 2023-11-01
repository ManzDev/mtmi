export interface RaidInfoType {
  displayName: string,
  username: string,
  profileImageURL: string,
  viewerCount: number
}

export type RaidGroupType = RaidInfoType | object;

export const parseRaid = (fields : any) : RaidGroupType => {
  if (!fields["msg-param-profileImageURL"]) { return {}; }

  const profileImageURL = fields["msg-param-profileImageURL"].replaceAll("%s", "150x150");

  return {
    displayName: fields["msg-param-displayName"],
    profileImageURL,
    username: fields["msg-param-login"],
    viewerCount: Number(fields["msg-param-viewerCount"])
  };
};
