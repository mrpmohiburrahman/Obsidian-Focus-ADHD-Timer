// components/TimerDisplay.tsx

import { formatTime } from "@/utils/formatTime";
import { BlurView } from "expo-blur";
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
    <View
      style={{
        alignItems: "center",
        marginVertical: moderateScale(40),
        // borderWidth: 1,
        borderColor: "black",
        borderRadius: 200,
      }}
    >
      <BlurView
        intensity={40}
        tint="systemUltraThinMaterialLight"
        style={{
          overflow: "hidden",
          borderRadius: moderateScale(250),
        }}
      >
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
      </BlurView>
      {/* <BlurView
        intensity={40}
        tint="systemUltraThinMaterialLight"
        style={{
          borderRadius: 500,
          height: moderateScale(250),
          width: moderateScale(250),
          overflow: "hidden",
          position: "absolute",
          zIndex: -1,
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    color: "#FFFFFF",
    fontSize: moderateScale(40),
    fontWeight: "600",
  },
});

export default TimerDisplay;
