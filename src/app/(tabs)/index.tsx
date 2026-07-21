import Button from "@/components/Button";
import GoalsList from "@/components/GoalsList";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Goals</Text>
      <View style={styles.goalsContainer}>
        <GoalsList />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Add Goal" theme="primary" />
      </View>
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
  },
  footerContainer: {
    flex: 1 / 4,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
});
