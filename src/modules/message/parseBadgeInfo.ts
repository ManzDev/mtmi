import { parseSlash } from "@/modules/utils";

export interface BadgeInfoType {
  [name: string]: string;
}

const BADGES = [
  "subscriber",
  "founder",
  "predictions",
];

export const parseBadgeInfo = (badgeInfo: string) => {
  const fieldsBadgeInfo: BadgeInfoType = parseSlash(badgeInfo, String) || {};

  const isPresent = Object.keys(fieldsBadgeInfo).every(badge => BADGES.includes(badge));
  !isPresent && console.log("----> badgeInfo descubierto: ", fieldsBadgeInfo);

  return {
    ...fieldsBadgeInfo
  };
};
