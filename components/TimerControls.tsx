// components/TimerControls.tsx

import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";

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
      {/* Play/Pause Button */}
      <TouchableOpacity
        onPress={isRunning ? onPause : onStart}
        style={styles.playPauseButton}
        accessibilityLabel={isRunning ? "Pause Timer" : "Start Timer"}
        accessibilityRole="button"
      >
        <Ionicons
          name={isRunning ? "pause" : "play"}
          size={moderateScale(30)} // Adjusted size for better fit
          color="#FFFFFF" // White icon for contrast
        />
      </TouchableOpacity>

      {/* Reset Button */}
      <TouchableOpacity
        onPress={onReset}
        style={styles.resetButton}
        accessibilityLabel="Reset Timer"
        accessibilityRole="button"
      >
        <Ionicons
          name="refresh"
          size={moderateScale(20)} // Adjusted size for better fit
          color="#FFFFFF" // White icon for contrast
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row", // Arrange buttons horizontally
    justifyContent: "center", // Center buttons horizontally
    alignItems: "center", // Center buttons vertically
    marginTop: moderateScale(30), // Top margin for spacing
  },
  playPauseButton: {
    width: moderateScale(80), // Button width
    height: moderateScale(80), // Button height
    borderRadius: moderateScale(40), // Circular shape
    backgroundColor: "#B98FFE", // Primary Color
    justifyContent: "center", // Center icon vertically
    alignItems: "center", // Center icon horizontally
    // Reduced Glow Effect
    shadowColor: "#B98FFE",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3, // Reduced from 0.7
    shadowRadius: moderateScale(10), // Reduced from 20
    elevation: 5, // Reduced from 10
  },

  resetButton: {
    position: "absolute",
    right: moderateScale(35),
    // marginLeft: moderateScale(30), // Space between Play/Pause and Reset
    width: moderateScale(40), // Button width
    height: moderateScale(40), // Button height
    borderRadius: moderateScale(20), // Circular shape
    backgroundColor: "#c847f4", // Start of Primary Gradient
    justifyContent: "center", // Center icon vertically
    alignItems: "center", // Center icon horizontally
    // Subtle Shadow for Reset Button
    shadowColor: "#c847f4",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3, // Reduced from 0.5
    shadowRadius: moderateScale(5), // Reduced from 10
    elevation: 3, // Reduced from 5
  },
});

export default TimerControls;
