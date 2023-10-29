interface RaidType {
  displayName: string,
  username: string,
  profileImageURL: string,
  viewerCount: number
}

type RaidInfoType = RaidType | null;

export const parseRaid = (fields) : RaidInfoType => {
  if (!fields["msg-param-profileImageURL"]) { return null; }

  const profileImageURL = fields["msg-param-profileImageURL"].replaceAll("%s", "150x150");

  return {
    displayName: fields["msg-param-displayName"],
    profileImageURL,
    username: fields["msg-param-login"],
    viewerCount: Number(fields["msg-param-viewerCount"])
  };
};
