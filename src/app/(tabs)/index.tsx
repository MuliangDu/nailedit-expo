import { createGoal, getGoals } from "@/api/goals";
import AddGoalModal from "@/components/AddGoalModal";
import Button from "@/components/Button";
import GoalsList from "@/components/GoalsList";
import type { AddGoalFormData, Goal } from "@/types/goal";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [isAddGoalVisible, setIsAddGoalVisible] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGoals() {
      try {
        setLoadError(null);

        const loadedGoals = await getGoals(1);

        console.log("Goals loaded from API:", loadedGoals);

        setGoals(loadedGoals);
      } catch (error) {
        console.error("Failed to load goals:", error);
        if (error instanceof Error) {
          setLoadError(error.message);
        } else {
          setLoadError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadGoals();
  }, []);

  async function handleAddGoal(formGoal: AddGoalFormData) {
    try {
      const createdGoal = await createGoal(1, formGoal);

      setGoals((currentGoals) => [...currentGoals, createdGoal]);

      setIsAddGoalVisible(false);
    } catch (error) {
      console.error("Failed to create goal", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Goals</Text>
      <View style={styles.goalsContainer}>
        {isLoading ? (
          <Text style={styles.statusText}>Loading goals...</Text>
        ) : loadError ? (
          <Text style={styles.errorText}>{loadError}</Text>
        ) : (
          <GoalsList goals={goals} />
        )}
      </View>
      <View style={styles.footerContainer}>
        <Button
          label="Add Goal"
          theme="primary"
          onPress={() => setIsAddGoalVisible(true)}
        />
      </View>
      <AddGoalModal
        isVisible={isAddGoalVisible}
        onClose={() => setIsAddGoalVisible(false)}
        onSubmit={handleAddGoal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1 / 4,
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  goalsContainer: {
    flex: 1,
    width: "100%",
  },
  footerContainer: {
    flex: 1 / 4,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  statusText: {
    flex: 1,
    color: "#b0b0b0",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
    paddingHorizontal: 20,
  },
});
