import { parseSlashToString } from "@/modules/utils";

/**
 * Badges que el usuario tiene visibles en el chat.
 */
export interface BadgeInfoType {
  /** Nombre del badge. */
  name: string,
  /** Valor asociado al badge. */
  value: number,
  /** Imagen identificativa del badge. */
  image: string,
  /** Descripción del badge. */
  description: string,
  /** Número completo de meses. */
  fullMonths?: number,
  /** Número del fundador. */
  founderNumber?: number,
  /** El usuario ha votado una predicción. */
  predictionInfo?: string,
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
