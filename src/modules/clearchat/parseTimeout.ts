import { parseBan, BanType } from "./parseBan.js";

export interface TimeoutType extends BanType {
  banDuration: number,
}

export const parseTimeout = (fields : any): TimeoutType => {
  const banData = parseBan(fields);

  return {
    banDuration: Number(fields["ban-duration"]),
    ...banData
  };
};
