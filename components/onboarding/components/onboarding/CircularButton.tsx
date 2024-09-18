import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import IconButton from "../shared/IconButton";
import { moderateScale } from "react-native-size-matters";
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const radius = 30;
const circumference = radius * Math.PI * 2;
type Props = {
  index: number;
  onPress: () => void;
  screensLength: number;
};
const centerX = 70;
const centerY = 70;
const CircularButton = ({ screensLength, onPress, index }: Props) => {
  const strokeOffset = useSharedValue(circumference);
  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: 500 }),
    };
  });
  useEffect(() => {
    let percentage = circumference / screensLength;
    strokeOffset.value = circumference - percentage * (index + 1);
  }, [index]);
  return (
    <View
      style={{
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        icon="arrow-right"
        onPress={onPress}
        roundness="full"
        size="big"
        style={{
          position: "absolute",
          zIndex: 2,
        }}
      />
      <Svg height={centerY * 2} width={centerX * 2}>
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke="grey"
          strokeWidth="2"
        />
        <AnimatedCircle
          animatedProps={animatedCircleProps}
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke="white"
          strokeWidth="4"
          strokeLinecap={"round"}
          strokeDasharray={`${radius * Math.PI * 2}`}
        />
      </Svg>
    </View>
  );
};

export default CircularButton;
