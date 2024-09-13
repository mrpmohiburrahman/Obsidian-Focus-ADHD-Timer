// components/TimerDisplay.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

type TimerDisplayProps = {
  progress: number;
  color: string;
  unfilledColor: string;
  elapsedTime: number;
  isAnimated: boolean;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  progress,
  color,
  unfilledColor,
  elapsedTime,
  isAnimated,
}) => {
  return (
    <View style={styles.container}>
      <Progress.Circle
        size={200}
        progress={progress}
        showsText={true}
        thickness={10}
        color={color} // Dynamic color based on lapCount
        unfilledColor={unfilledColor} // Set to previous fill color
        borderWidth={0}
        animated={isAnimated}
        strokeCap="round"
        formatText={() => {
          return formatTime(Math.floor(elapsedTime));
        }}
      ></Progress.Circle>
    </View>
  );
};

// Utility function imported
import { formatTime } from "../utils/formatTime";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 40,
  },
  timerText: {
    fontSize: 32,
    color: "#FFFFFF",
    fontFamily: "Courier", // Monospace font for timer
  },
});

export default TimerDisplay;
