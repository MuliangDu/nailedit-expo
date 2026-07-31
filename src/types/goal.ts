export type Goal = {
  id: number;
  name: string;
  description: string;
  duration: number;
  streak: number;
};

export type AddGoalFormData = {
  name: string;
  description: string;
  duration: number;
};

export type GoalResponse = Goal & {
  user_id: number;
  created_at: string;
  last_checked_in_at: string | null;
  longest_streak: number;
};

export type CreateGoalRequest = AddGoalFormData & {
  user_id: number;
};
