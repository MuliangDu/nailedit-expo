import AddGoalModal from "@/components/AddGoalModal";
import Button from "@/components/Button";
import GoalsList from "@/components/GoalsList";
import type { AddGoalFormData, Goal } from "@/types/goal";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const initialGoals: Goal[] = [
  {
    id: 1,
    name: "Eat vegetable",
    streak: 12,
    duration: 20,
    description: "eat vegetable everyday",
  },
  {
    id: 2,
    name: "study",
    streak: 15,
    duration: 25,
    description: "study everyday",
  },
];

export default function Index() {
  const [isAddGoalVisible, setIsAddGoalVisible] = useState(false);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  function handleAddGoal(formGoal: AddGoalFormData) {
    const newGoal: Goal = {
      id: Date.now(),
      name: formGoal.name,
      description: formGoal.description,
      duration: formGoal.duration,
      streak: 0,
    };

    setGoals((currentGoals) => [...currentGoals, newGoal]);

    setIsAddGoalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Goals</Text>
      <View style={styles.goalsContainer}>
        <GoalsList goals={goals} />
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
});
