import { cleanMessage } from "@/modules/utils";

interface SubType {
  cumulativeMonths: number,
  months: number,
  multimonthDuration: number,
  multimonthTenure: number,
  shouldShareStreak: boolean,
  streakMonths: number,
  subPlan: string,
  subPlanName: string,
  wasGifted: boolean
}

type SubInfoType = SubType | null;

export const parseSub = (fields) : SubInfoType => {
  // Si no es de tipo suscripción
  if (!fields["msg-param-sub-plan"]) { return null; }

  const subPlanName = cleanMessage(fields["msg-param-sub-plan-name"]);
  const wasGifted = fields["msg-param-was-gifted"];

  return {
    subPlanName,
    cumulativeMonths: fields["msg-param-cumulative-months"],
    months: fields["msg-param-months"],
    multimonthDuration: fields["msg-param-multimonth-duration"],
    multimonthTenure: fields["msg-param-multimonth-tenure"],
    shouldShareStreak: Boolean(Number(fields["msg-param-should-share-streak"])),
    streakMonths: fields["msg-param-streak-months"] ?? null,
    subPlan: fields["msg-param-sub-plan"],
    wasGifted: wasGifted !== "false",
  };
};
