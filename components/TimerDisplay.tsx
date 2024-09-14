// components/TimerDisplay.tsx

import { formatTime } from "@/utils/formatTime";
import React from "react";
import { View } from "react-native";
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
  return (
    <View
      style={{
        alignItems: "center",
        marginVertical: 40,
        borderWidth: 1,
        borderColor: "white",
      }}
    >
      <Progress.Circle
        size={moderateScale(250)}
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
      />
    </View>
  );
};

export default TimerDisplay;
