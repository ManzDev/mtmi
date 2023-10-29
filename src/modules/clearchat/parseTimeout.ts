import { parseBan, BanType } from "./parseBan.js";

export interface TimeoutType extends BanType {
  banDuration: number,
}

export const parseTimeout = (fields): TimeoutType => {
  const banData = parseBan(fields);

  return {
    banDuration: Number(fields["ban-duration"]),
    ...banData
  };
};
