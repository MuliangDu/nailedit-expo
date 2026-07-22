import { Goal } from "@/types/goal";
import { Pressable, StyleSheet, Text } from "react-native";

type GoalCardProps = {
  goal: Goal;
  onPress: (goal: Goal) => void;
};
export default function GoalCard({ goal, onPress }: GoalCardProps) {
  return (
    <Pressable style={styles.goalCard} onPress={() => onPress(goal)}>
      <Text style={styles.goalName}>{goal.name}</Text>
      <Text style={styles.streak}>{goal.streak} day streak</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  goalCard: {
    backgroundColor: "#3a3f44",
    borderRadius: 12,
    padding: 16,
  },

  goalName: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  streak: {
    color: "#b0b0b0",
    fontSize: 17,
    marginTop: 6,
    fontWeight: "600",
  },
});
