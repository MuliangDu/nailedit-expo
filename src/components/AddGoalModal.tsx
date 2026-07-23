import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import type { AddGoalFormData } from "@/types/goal";
import { useEffect, useState } from "react";

type AddGoalModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (goal: AddGoalFormData) => void;
};

export default function AddGoalModal({
  isVisible,
  onClose,
  onSubmit,
}: AddGoalModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isVisible) {
      setName("");
      setDescription("");
      setDuration("");
      setError("");
    }
  }, [isVisible]);

  function handleSubmit() {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const parsedDuration = Number(duration);

    if (!trimmedName) {
      setError("Please enter a goal name");
      return;
    }

    if (!trimmedDescription) {
      setError("Please enter a description");
      return;
    }

    if (
      !duration.trim() ||
      !Number.isInteger(parsedDuration) ||
      parsedDuration <= 0
    ) {
      setError("Duration must be a positive whole number.");
      return;
    }

    setError("");

    const goalData: AddGoalFormData = {
      name: trimmedName,
      description: trimmedDescription,
      duration: parsedDuration,
    };
    onSubmit(goalData);
  }

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add goal</Text>

          <Text style={styles.label}>Goal name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={"For example: Go to the gym"}
            placeholderTextColor={"#777d84"}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder={"What do you want to achieve?"}
            placeholderTextColor={"#777d84"}
            multiline={true}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Duration in days</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            placeholder={"For example: 30"}
            placeholderTextColor={"#777d84"}
            keyboardType={"number-pad"}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable style={styles.createButton} onPress={handleSubmit}>
            <Text style={styles.createButtonText}>Create Goal</Text>
          </Pressable>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#25292e",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  closeButton: {
    height: 50,
    backgroundColor: "#ffd33d",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  label: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 8,
  },
  input: {
    minHeight: 52,
    color: "#fff",
    fontSize: 16,
    backgroundColor: "#3a3f44",
    borderWidth: 1,
    borderColor: "#50565c",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  descriptionInput: {
    minHeight: 100,
  },
  createButton: {
    height: 50,
    backgroundColor: "#36d17c",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  createButtonText: {
    color: "#25292e",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginTop: 12,
  },
});
