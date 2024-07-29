import { cleanMessage } from "@/modules/utils";

export interface PrimePaidUpgradeInfoType {
  type: string,
  username: string,
  displayName: string,
  subPlan: string,
  systemMsg: string,
}

export const parsePrimePaidUpgrade = (fields : any) : PrimePaidUpgradeInfoType => {
  const username = fields.login;

  return {
    type: fields["msg-id"],
    username,
    displayName: fields["display-name"],
    subPlan: fields["msg-param-sub-plan"],
    systemMsg: cleanMessage(fields["system-msg"]),
  };
};
