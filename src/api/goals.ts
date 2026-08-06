import type {
  AddGoalFormData,
  CreateGoalRequest,
  GoalResponse,
} from "@/types/goal";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getGoals(userId: number): Promise<GoalResponse[]> {
  if (!API_URL) {
    throw new Error("EXPO_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/users/${userId}/goals`);

  if (!response.ok) {
    throw new Error(`Failed to load goals: ${response.status}`);
  }
  const goals: GoalResponse[] = await response.json();

  return goals;
}

export async function createGoal(
  userId: number,
  formGoal: AddGoalFormData,
): Promise<GoalResponse> {
  if (!API_URL) {
    throw new Error("EXPO_PUBLIC_API_URL is not configured");
  }
  const requestBody: CreateGoalRequest = { ...formGoal, user_id: userId };

  const response = await fetch(`${API_URL}/users/${userId}/goals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Failed to create goal: ${response.status}`);
  }

  const createdGoal: GoalResponse = await response.json();

  return createdGoal;
}
