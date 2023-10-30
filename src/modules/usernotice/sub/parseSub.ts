import { parseSubPlan, SubPlanType } from "@/modules/usernotice/sub/parseSubPlan";

interface SubType {
  cumulativeMonths: number,
  months: number,
  multimonthDuration: number,
  multimonthTenure: number,
  shouldShareStreak: boolean,
  streakMonths: number,
  subPlan: SubPlanType,
  wasGifted: boolean
}

export type SubInfoType = SubType | object;

const SUBTYPES = ["sub", "resub"];

export const parseSub = (fields : any) : SubInfoType => {
  // Si no es de tipo suscripción
  if (!SUBTYPES.includes(fields["msg-id"])) { return {}; }

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
  };
};
