// components/TimerControls.tsx

import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";

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
        activeOpacity={0.7} // Adds touch feedback
      >
        <Ionicons
          name={isRunning ? "pause" : "play"}
          size={moderateScale(40)} // Increased size for better visibility
          color="#FFFFFF" // White icon for contrast
        />
      </TouchableOpacity>

      {/* Reset Button */}
      <TouchableOpacity
        onPress={onReset}
        style={styles.resetButton}
        accessibilityLabel="Reset Timer"
        accessibilityRole="button"
        activeOpacity={0.7} // Adds touch feedback
      >
        <Ionicons
          name="refresh"
          size={moderateScale(25)} // Slightly increased size for better fit
          color="#FFFFFF" // White icon for contrast
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", // Center Play/Pause button
    alignItems: "center", // Center vertically
  },
  playPauseButton: {
    width: moderateScale(80), // Button width
    height: moderateScale(80), // Button height
    borderRadius: moderateScale(40), // Circular shape
    backgroundColor: Colors.secondary, // Primary Color
    justifyContent: "center", // Center icon vertically
    alignItems: "center", // Center icon horizontally
    // Subtle Glow Effect
    shadowColor: Colors.secondary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3, // Reduced from 0.7
    shadowRadius: moderateScale(10), // Reduced from 20
    elevation: 5, // Reduced from 10
  },
  resetButton: {
    // marginLeft: moderateScale(30), // Space between Play/Pause and Reset
    position: "absolute",
    right: moderateScale(30),
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
