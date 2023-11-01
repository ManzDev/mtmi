import { parseBan, BanInfoType } from "./parseBan.js";

export interface TimeoutInfoType extends BanInfoType {
  banDuration: number,
}

export const parseTimeout = (fields : any): TimeoutInfoType => {
  const banData = parseBan(fields);

  return {
    banDuration: Number(fields["ban-duration"]),
    ...banData
  };
};
