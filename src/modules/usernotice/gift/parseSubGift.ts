import { cleanMessage } from "@/modules/utils";
import { parseSubPlan, SubPlanType } from "@/modules/usernotice/sub/parseSubPlan";
import { parseGoal, GoalGroupType } from "./parseGoal";

export interface GiftInfoType {
  giftMonths: number,
  months: number,
  originId: string,
  isAnonymous: boolean,
  gifterUserName: string,
  gifterDisplayName: string,
  recipientDisplayName: string,
  recipientId: number,
  recipientUserName: string,
  subPlan: SubPlanType
  systemMsg: string,
  senderCount?: number,
  funString?: string,
  goalInfo?: GoalGroupType
}

export const parseSubGift = (fields : any) : GiftInfoType => {
  const originId = cleanMessage(fields["msg-param-origin-id"]);
  const subPlan = parseSubPlan(fields);
  const goalInfo = parseGoal(fields);

  const data : GiftInfoType = {
    giftMonths: Number(fields["msg-param-gift-months"]),
    months: Number(fields["msg-param-months"]),
    originId,
    isAnonymous: fields.login === "ananonymousgifter",
    gifterUserName: fields.login,
    gifterDisplayName: fields["display-name"],
    recipientDisplayName: fields["msg-param-recipient-display-name"],
    recipientId: Number(fields["msg-param-recipient-id"]),
    recipientUserName: fields["msg-param-recipient-user-name"],
    subPlan,
    systemMsg: cleanMessage(fields["system-msg"])
  };

  fields["msg-param-sender-count"] && (data.senderCount = Number(fields["msg-param-sender-count"]));
  Object.keys(goalInfo).length && (data.goalInfo = goalInfo);
  fields["msg-param-fun-string"] && (data.funString = fields["msg-param-fun-string"]);

  return data;
};
