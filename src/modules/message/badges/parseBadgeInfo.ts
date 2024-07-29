import { parseSlashToString } from "@/modules/utils";

export interface BadgeInfoType {
  name: string,
  value: number,
  image: string,
  fullMonths?: number,
  founderNumber?: number,
  predictionInfo?: string,
  description: string
}

const BADGES = [
  "subscriber",
  "founder",
  "predictions",
];

export const parseBadgeInfo = (badgeInfo: string) => {
  const fieldsBadgeInfo: BadgeInfoType = parseSlashToString(badgeInfo) || {};

  const isPresent = Object.keys(fieldsBadgeInfo).every(badge => BADGES.includes(badge));
  !isPresent && console.log("----> badgeInfo descubierto: ", fieldsBadgeInfo);

  return {
    ...fieldsBadgeInfo
  };
};
