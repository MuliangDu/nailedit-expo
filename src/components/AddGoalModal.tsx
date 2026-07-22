import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useState } from "react";

type AddGoalModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function AddGoalModal({
  isVisible,
  onClose,
}: AddGoalModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

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
});
