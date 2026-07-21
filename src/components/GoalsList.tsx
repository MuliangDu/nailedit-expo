import { FlatList, Pressable, StyleSheet, Text } from "react-native";

type Goal = {
  id: string;
  name: string;
  streak: number;
  target: number;
};

const goals: Goal[] = [
  { id: "1", name: "Go to the Gym", streak: 3, target: 20 },
  { id: "2", name: "Study React", streak: 15, target: 30 },
];

export default function GoalsList() {
  return (
    <FlatList
      data={goals}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={styles.goalCard}
          onPress={() => alert(`${item.id} is pressed`)}
        >
          <Text style={styles.goalName}>{item.name}</Text>
          <Text style={styles.streak}>{item.streak} day streak</Text>
        </Pressable>
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
