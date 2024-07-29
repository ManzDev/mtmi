import { PremiumColorType, ColorType } from "./colors/colors";
import bots from "./bots.js";

const BOTNAMES = bots.map((bot : any) => bot.name);

// type UserType = "normal" | "admin" | "global_mod" | "staff";  // Deprecated

export interface UserInfoType {
  username: string,
  displayName: string,
  color: ColorType | PremiumColorType,
  isVip: boolean,
  isMod: boolean,
  isSub: boolean,
  isTurbo: boolean,
  isPrime: boolean,
  isBot: boolean,
  // userType: UserType // Deprecated
}

export const parseUser = (fields: any): UserInfoType => ({
  username: fields.username,
  displayName: fields["display-name"] || fields.username,
  color: fields.color.toLowerCase() || "currentColor",
  isMod: Boolean(fields.mod === "1"),
  isVip: Boolean(fields.vip === "1"),
  isSub: Boolean(fields.subscriber !== "0"),
  isPrime: Boolean(fields.badges?.premium === "1"),
  // isTurbo: Boolean(fields.turbo), // Deprecated
  isTurbo: Boolean(fields.badges?.turbo === "1"),
  isBot: Boolean(BOTNAMES.includes(fields.username))
  // serType: fields["user-type"] || "normal",
});
