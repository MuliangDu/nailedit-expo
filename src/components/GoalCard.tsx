import type { Goal } from "@/types/goal";
import { Pressable, StyleSheet, Text, View } from "react-native";

const PROGRESS_SEGMENTS = 36;

function ProgressRing({ streak, duration }: Pick<Goal, "streak" | "duration">) {
  const progress = duration > 0 ? Math.min(Math.max(streak / duration, 0), 1) : 0;
  const activeSegments = Math.round(progress * PROGRESS_SEGMENTS);

  return (
    <View
      style={styles.progressRing}
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max: duration,
        now: Math.min(streak, duration),
      }}
    >
      {Array.from({ length: PROGRESS_SEGMENTS }, (_, index) => (
        <View
          key={index}
          style={[
            styles.progressSegmentContainer,
            { transform: [{ rotate: `${index * (360 / PROGRESS_SEGMENTS)}deg` }] },
          ]}
        >
          <View
            style={[
              styles.progressSegment,
              index < activeSegments && styles.progressSegmentActive,
            ]}
          />
        </View>
      ))}
      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
    </View>
  );
}

type GoalCardProps = {
  goal: Goal;
  isCheckingIn: boolean;
  onCheckIn: (goalId: number) => void;
};
export default function GoalCard({
  goal,
  isCheckingIn,
  onCheckIn,
}: GoalCardProps) {
  return (
    <View style={styles.goalCard}>
      <View style={styles.goalDetails}>
        <Text style={styles.goalName}>{goal.name}</Text>
        <Text style={styles.streak}>
          {goal.streak} day streak / {goal.duration} Days
        </Text>
        <Pressable
          accessibilityRole="button"
          disabled={isCheckingIn}
          onPress={() => onCheckIn(goal.id)}
          style={({ pressed }) => [
            styles.checkInButton,
            pressed && styles.checkInButtonPressed,
            isCheckingIn && styles.checkInButtonDisabled,
          ]}
        >
          <Text style={styles.checkInButtonText}>
            {isCheckingIn ? "Checking in..." : "Check in today"}
          </Text>
        </Pressable>
      </View>
      <ProgressRing streak={goal.streak} duration={goal.duration} />
    </View>
  );
}

const styles = StyleSheet.create({
  goalCard: {
    backgroundColor: "#3a3f44",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  goalDetails: {
    flex: 1,
    paddingRight: 16,
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

  checkInButton: {
    alignSelf: "flex-start",
    backgroundColor: "#36d17c",
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  checkInButtonPressed: {
    opacity: 0.8,
  },

  checkInButtonDisabled: {
    opacity: 0.6,
  },

  checkInButtonText: {
    color: "#25292e",
    fontSize: 14,
    fontWeight: "700",
  },

  progressRing: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
  },

  progressSegmentContainer: {
    position: "absolute",
    width: 58,
    height: 58,
    alignItems: "center",
  },

  progressSegment: {
    width: 3,
    height: 6,
    borderRadius: 2,
    backgroundColor: "#596067",
  },

  progressSegmentActive: {
    backgroundColor: "#36d17c",
  },

  progressText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
});
