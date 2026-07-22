import { Goal } from "@/types/goal";
import { FlatList, StyleSheet } from "react-native";
import GoalCard from "./GoalCard";

const goals: Goal[] = [
  { id: 1, name: "Go to the Gym", streak: 3, duration: 20 },
  { id: 2, name: "Study React", streak: 15, duration: 30 },
];

export default function GoalsList() {
  return (
    <FlatList
      data={goals}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <GoalCard goal={item} onPress={() => alert(`${item.id} is pressed`)} />
      )}
      style={styles.goalList}
      contentContainerStyle={styles.goalListContent}
    />
  );
}

const styles = StyleSheet.create({
  goalList: {
    flex: 1,
    width: "100%",
  },
  goalListContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
});
