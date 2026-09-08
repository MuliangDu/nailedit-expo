import type {
  AddGoalFormData,
  CheckInRequest,
  CheckInResultResponse,
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

export async function checkInGoal(
  userId: number,
  goalId: number,
): Promise<GoalResponse> {
  if (!API_URL) {
    throw new Error("EXPO_PUBLIC_API_URL is not configured");
  }

  const now = new Date();
  const localDate = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
  const requestBody: CheckInRequest = { check_in_date: localDate };

  const response = await fetch(
    `${API_URL}/users/${userId}/goals/${goalId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    },
  );

  if (!response.ok) {
    const errorBody: { detail?: string } = await response
      .json()
      .catch(() => ({}));
    throw new Error(
      errorBody.detail ?? `Failed to check in: ${response.status}`,
    );
  }

  const result: CheckInResultResponse = await response.json();

  if (!result.success || !result.goal) {
    throw new Error(result.message || "Failed to check in");
  }

  return result.goal;
}
