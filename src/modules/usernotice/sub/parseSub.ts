import { parseSubPlan, SubPlanType } from "@/modules/usernotice/sub/parseSubPlan";
import { cleanMessage } from "@/modules/utils";

export type SubType = "sub" | "resub";

export interface SubInfoType {
  cumulativeMonths: number,
  months: number,
  multimonthDuration: number,
  multimonthTenure: number,
  shouldShareStreak: boolean,
  streakMonths: number,
  subPlan: SubPlanType,
  wasGifted: boolean,
  systemMsg: string
}

export type SubInfoOptionalType = SubInfoType | object;

export const parseSub = (fields : any) : SubInfoOptionalType => {
  // Si no es de tipo suscripción
  if (!["sub", "resub"].includes(fields["msg-id"])) { return {}; }

  const subPlan = parseSubPlan(fields);
  const wasGifted = fields["msg-param-was-gifted"];

  return {
    cumulativeMonths: Number(fields["msg-param-cumulative-months"]),
    months: Number(fields["msg-param-months"]),
    multimonthDuration: Number(fields["msg-param-multimonth-duration"]),
    multimonthTenure: Number(fields["msg-param-multimonth-tenure"]),
    shouldShareStreak: Boolean(Number(fields["msg-param-should-share-streak"])),
    streakMonths: Number(fields["msg-param-streak-months"] ?? 0),
    subPlan,
    wasGifted: wasGifted !== "false",
    systemMsg: cleanMessage(fields["system-msg"])
  };
};
