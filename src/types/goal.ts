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
