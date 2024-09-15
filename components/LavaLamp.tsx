import { useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { View } from "react-native";
import randomColor from "randomcolor";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

type LavaLampProps = {
  count?: number;
  hue?: string;
  intensity?: number;
  colors?: string[];
  duration?: number;
};

type Circle = {
  x: number;
  y: number;
  radius: number;
  index: number;
  color: string;
};
type CircleProps = {
  circle: Circle;
  duration?: number;
  withBlur?: boolean;
};

export function LavaLamp({
  count = 4,
  hue = "green",
  intensity = 100,
  colors,
  duration,
}: LavaLampProps) {
  const { width, height } = useWindowDimensions();
  const circles = useMemo<Circle[]>(() => {
    const _colors =
      colors ??
      randomColor({
        count,
        hue,
        format: "rgba",
        luminosity: "light",
        alpha: 0.3,
      });
    return _colors.map((color, index) => {
      const rand = randomNumber(5, 12) / 10;
      const radius = (width * rand) / 2;
      return {
        x: Math.random() * (width - radius * 2),
        y: Math.random() * (height - radius * 2),
        radius,
        index,
        color,
      };
    });
  }, [count, hue, colors]);
  const bgColor = randomColor({ hue, count: 1, luminosity: "dark" });

  return (
    <View
      style={[StyleSheet.absoluteFillObject, { backgroundColor: bgColor[0] }]}
    >
      {circles.map((circle) => {
        return (
          <Circle
            key={`circle-${circle.color}-${circle.index}`}
            circle={circle}
            duration={duration}
            withBlur={intensity !== 0}
          />
        );
      })}
      <BlurView
        style={StyleSheet.absoluteFillObject}
        intensity={intensity}
        tint="light"
      />
    </View>
  );
}

function Circle({ circle, duration = 10000, withBlur }: CircleProps) {
  // possible a full circle rotation?
  const randRotation = Math.random() * 360;

  const rotation = useDerivedValue(() => {
    return withRepeat(
      withSequence(
        withTiming(randRotation, { duration: 0 }),
        withTiming(randRotation + 360, {
          duration,
          easing: Easing.linear,
        })
      ),
      -1, // also as Infinity
      false // no repeat reverse
    );
  }, [duration]);

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        stylez,
        {
          transformOrigin: ["50%", circle.y, 0],
        },
      ]}
    >
      <View
        style={{
          backgroundColor: circle.color,
          position: "absolute",
          left: circle.x - circle.radius,
          top: circle.y - circle.radius,
          width: circle.radius * 2,
          height: circle.radius * 2,
          borderRadius: circle.radius,
        }}
      />
      {withBlur && (
        <BlurView
          style={StyleSheet.absoluteFillObject}
          intensity={5}
          tint="light"
        />
      )}
    </Animated.View>
  );
}
