// components/TimerDisplay.tsx

import { formatTime } from "@/utils/formatTime";
import React from "react";
import { View } from "react-native";
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
    <View style={{ alignItems: "center", marginVertical: 40 }}>
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
      />
    </View>
  );
};

// Utility function imported

export default TimerDisplay;
