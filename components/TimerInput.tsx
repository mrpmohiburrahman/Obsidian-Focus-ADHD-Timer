// components/TimerInput.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { formatTime } from "@/utils/formatTime";
import { moderateScale } from "react-native-size-matters";

type TimerInputProps = {
  fixedTime: number;
  setFixedTime: (time: number) => void;
};

const TimerInput: React.FC<TimerInputProps> = ({ fixedTime, setFixedTime }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(Math.floor(fixedTime / 3600));
  const [minutes, setMinutes] = useState<number>(
    Math.floor((fixedTime % 3600) / 60)
  );
  const [seconds, setSeconds] = useState<number>(fixedTime % 60);

  // Update local state when fixedTime changes externally
  useEffect(() => {
    setHours(Math.floor(fixedTime / 3600));
    setMinutes(Math.floor((fixedTime % 3600) / 60));
    setSeconds(fixedTime % 60);
  }, [fixedTime]);

  const handleConfirm = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      setFixedTime(totalSeconds);
      setModalVisible(false);
    } else {
      alert("Please set a time greater than zero.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fixed Time:</Text>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Set Timer Duration"
        accessibilityRole="button"
      >
        <Ionicons name="time-outline" size={30} color="#FFFFFF" />
        <Text style={styles.timeText}>{formatTime(fixedTime)}</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade" // Changed to 'fade' for smoother appearance
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Set Timer Duration</Text>
            <View style={styles.pickersContainer}>
              <View style={styles.pickerWrapper}>
                <Text style={styles.pickerLabel}>Hours</Text>
                <Picker
                  selectedValue={hours}
                  style={styles.picker}
                  onValueChange={(itemValue) => setHours(itemValue)}
                  mode="dropdown"
                  itemStyle={
                    Platform.OS === "ios" ? styles.pickerItem : undefined
                  }
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <Picker.Item key={i} label={`${i}`} value={i} />
                  ))}
                </Picker>
              </View>
              <View style={styles.pickerWrapper}>
                <Text style={styles.pickerLabel}>Minutes</Text>
                <Picker
                  selectedValue={minutes}
                  style={styles.picker}
                  onValueChange={(itemValue) => setMinutes(itemValue)}
                  mode="dropdown"
                  itemStyle={
                    Platform.OS === "ios" ? styles.pickerItem : undefined
                  }
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <Picker.Item key={i} label={`${i}`} value={i} />
                  ))}
                </Picker>
              </View>
              <View style={styles.pickerWrapper}>
                <Text style={styles.pickerLabel}>Seconds</Text>
                <Picker
                  selectedValue={seconds}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSeconds(itemValue)}
                  mode="dropdown"
                  itemStyle={
                    Platform.OS === "ios" ? styles.pickerItem : undefined
                  }
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <Picker.Item key={i} label={`${i}`} value={i} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.modalButtons}>
              <View style={styles.buttonContainer}>
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                  color={Platform.OS === "ios" ? "#BB86FC" : "#FF3B30"}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="Confirm"
                  onPress={handleConfirm}
                  color={Platform.OS === "ios" ? "#03DAC6" : "#34C759"}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "center",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  timeText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pickersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  pickerWrapper: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  pickerLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 5,
  },
  picker: {
    height: moderateScale(170), // Reduced height for compactness
    width: "100%",
    color: "#FFFFFF",
  },
  pickerItem: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default TimerInput;
