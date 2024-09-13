
// components/TimerControls.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type TimerControlsProps = {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <View style={styles.container}>
      {!isRunning ? (
        <TouchableOpacity
          style={styles.button}
          onPress={onStart}
          accessibilityLabel="Start Timer"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={onPause}
          accessibilityLabel="Pause Timer"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={onReset}
        accessibilityLabel="Reset Timer"
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#BB86FC", // Base color for buttons
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 2, // Add shadow for Android
    shadowColor: "#000", // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default TimerControls;