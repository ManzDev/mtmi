import { cleanMessage } from "@/modules/utils";

export interface ViewerMilestoneType {
  category: string,
  copoReward: number,
  value: number,
  systemMsg: string
}

// export type RaidGroupType = ViewerMilestoneType | object;

export const parseViewerMilestone = (fields : any) : ViewerMilestoneType => {

  const category = fields["msg-param-category"];
  const copoReward = fields["msg-param-copoReward"];
  const value = fields["msg-param-value"];
  const systemMsg = cleanMessage(fields["system-msg"]);

  return {
    category,
    copoReward: Number(copoReward),
    value: Number(value),
    systemMsg
  };
};
