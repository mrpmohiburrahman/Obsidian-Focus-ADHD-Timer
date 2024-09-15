// components/TimerDisplay.tsx

import { formatTime } from "@/utils/formatTime";
import React from "react";
import { View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { moderateScale } from "react-native-size-matters";

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
  // Reduce the opacity of the unfilled color
  const unfilledColorWithOpacity = unfilledColor + "55"; // 33% opacity

  return (
    <View style={styles.container}>
      <Progress.Circle
        size={moderateScale(250)}
        progress={progress}
        showsText={true}
        thickness={10}
        color={color}
        unfilledColor={unfilledColorWithOpacity}
        borderWidth={0}
        animated={isAnimated}
        strokeCap="round"
        formatText={() => formatTime(Math.floor(elapsedTime))}
        textStyle={styles.text}
        accessibilityLabel={`Timer is at ${formatTime(
          Math.floor(elapsedTime)
        )}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: moderateScale(40),
  },
  text: {
    color: "#FFFFFF",
    fontSize: moderateScale(40),
    fontWeight: "600",
  },
});

export default TimerDisplay;
