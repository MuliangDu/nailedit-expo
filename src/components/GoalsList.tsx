import type { Goal } from "@/types/goal";
import { FlatList, StyleSheet } from "react-native";
import GoalCard from "./GoalCard";

type GoalsListProps = {
  goals: Goal[];
};

export default function GoalsList({ goals }: GoalsListProps) {
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
