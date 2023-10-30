import { cleanMessage } from "@/modules/utils";

export interface SubPlanType {
  planName: string,
  plan: string,
  isPrime: boolean,
  isTier1: boolean,
  isTier2: boolean,
  isTier3: boolean
}

export const parseSubPlan = (fields : any) : SubPlanType => {
  const plan = fields["msg-param-sub-plan"];
  const planName = cleanMessage(fields["msg-param-sub-plan-name"]);

  return {
    plan,
    planName: cleanMessage(planName),
    isPrime: plan === "Prime",
    isTier1: plan === "1000",
    isTier2: plan === "2000",
    isTier3: plan === "3000"
  };
};
