import { parseBan, BanInfoType } from "./parseBan.js";

export interface TimeoutInfoType extends BanInfoType {
  type: string,
  banDuration: number,
}

export const parseTimeout = (fields : any): TimeoutInfoType => {
  const banData = parseBan(fields);

  return {
    ...banData,
    type: "timeout",
    banDuration: Number(fields["ban-duration"]),
  };
};
