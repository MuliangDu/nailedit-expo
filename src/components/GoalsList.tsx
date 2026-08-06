import type { Goal } from "@/types/goal";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}> No goals yet</Text>
          <Text style={styles.emptyDescription}>
            {" "}
            Create your first goal to start building a streak.{" "}
          </Text>
        </View>
      }
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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 700,
    textAlign: "center",
  },
  emptyDescription: {
    color: "#b0b0b0",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 8,
  },
});
