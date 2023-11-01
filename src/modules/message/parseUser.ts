import { PremiumColorType, ColorType } from "./colors/colors";

type UserType = "normal" | "admin" | "global_mod" | "staff";

export interface UserInfoType {
  username: string,
  displayName: string,
  color: ColorType | PremiumColorType,
  isVip: boolean,
  isMod: boolean,
  isSub: boolean,
  isTurbo: boolean,
  userType: UserType
}

export const parseUser = (fields: any): UserInfoType => ({
  username: fields.username,
  displayName: fields["display-name"] || fields.username,
  color: fields.color.toLowerCase() || "currentColor",
  isMod: Boolean(fields.mod),
  isVip: Boolean(fields.vip),
  isSub: Boolean(fields.subscriber),
  isTurbo: Boolean(fields.turbo),
  userType: fields["user-type"] || "normal",
});
