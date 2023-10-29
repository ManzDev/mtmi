type UserTypeType = "normal" | "admin" | "global_mod" | "staff";

interface UserInfoType {
  username: string,
  displayName: string,
  color: string,
  isVip: boolean,
  isMod: boolean,
  isSub: boolean,
  isTurbo: boolean,
  userType: UserTypeType
}

export const parseUser = (fields): UserInfoType => ({
  username: fields.username,
  displayName: fields["display-name"] || fields.username,
  color: fields.color || "currentColor",
  isMod: Boolean(fields.mod),
  isVip: Boolean(fields.vip),
  isSub: Boolean(fields.subscriber),
  isTurbo: Boolean(fields.turbo),
  userType: fields["user-type"] || "normal",
});
