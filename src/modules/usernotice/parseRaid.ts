interface RaidType {
  displayName: string,
  username: string,
  profileImageURL: string,
  viewerCount: number
}

export type RaidInfoType = RaidType | object;

export const parseRaid = (fields : any) : RaidInfoType => {
  if (!fields["msg-param-profileImageURL"]) { return {}; }

  const profileImageURL = fields["msg-param-profileImageURL"].replaceAll("%s", "150x150");

  return {
    displayName: fields["msg-param-displayName"],
    profileImageURL,
    username: fields["msg-param-login"],
    viewerCount: Number(fields["msg-param-viewerCount"])
  };
};
