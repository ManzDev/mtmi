export interface GoalInfoType {
  contributionType: string,
  currentContributions: number,
  description: string,
  targetContributions: number,
  userContributions: number
}

export type GoalGroupType = GoalInfoType | object;

export const parseGoal = (fields : any) : GoalGroupType => {
  if (!fields["msg-param-goal-contribution-type"]) {
    return {};
  }

  return {
    contributionType: fields["msg-param-goal-contribution-type"],
    currentContributions: Number(fields["msg-param-goal-current-contributions"]),
    description: fields["msg-param-goal-description"],
    targetContributions: Number(fields["msg-param-goal-target-contributions"]),
    userContributions: Number(fields["msg-param-goal-user-contributions"])
  };
};
