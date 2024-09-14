// Index.tsx

import LapHistory from "@/components/LapHistory";
import TimerControls from "@/components/TimerControls";
import TimerDisplay from "@/components/TimerDisplay";
import TimerInput from "@/components/TimerInput";
import { useTimer } from "@/hooks/useTimer";
import { formatTime } from "@/utils/formatTime";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

type IndexProps = {};

const Index: React.FC<IndexProps> = () => {
  const {
    fixedTime,
    setFixedTime,
    elapsedTime,
    isRunning,
    start,
    pause,
    reset,
    lapCount,
    laps,
    isAnimated,
  } = useTimer();

  // Define color palette inside the main component for consistent access
  const colors: string[] = [
    "#BB86FC", // Purple
    "#03DAC6", // Teal
    "#CF6679", // Pink
    "#FF9800", // Orange
    "#8BC34A", // Light Green
  ];

  // Calculate current and previous colors
  const currentColor: string = colors[lapCount % colors.length];
  const previousColor: string =
    lapCount === 0 ? "#1E1E1E" : colors[(lapCount - 1) % colors.length];

  // Calculate progress for the current interval
  const progress = fixedTime === 0 ? 0 : (elapsedTime % fixedTime) / fixedTime;

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "#121212", // Dark background
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text
        style={{
          fontSize: 22,
          textAlign: "center",
          color: "#FFFFFF", // White text
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        Timer App
      </Text>

      <TimerDisplay
        progress={progress}
        color={currentColor}
        unfilledColor={previousColor}
        elapsedTime={elapsedTime}
        isAnimated={isAnimated}
      />

      <TimerInput fixedTime={fixedTime} setFixedTime={setFixedTime} />

      <TimerControls
        isRunning={isRunning}
        onStart={start}
        onPause={pause}
        onReset={reset}
      />

      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          color: "#BBBBBB",
          marginTop: 10,
        }}
      >
        Fixed Time: {formatTime(fixedTime)}
      </Text>

      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          color: "#BBBBBB",
          marginTop: 10,
        }}
      >
        Completed Intervals: {lapCount}
      </Text>

      {laps.length > 0 && <LapHistory laps={laps} formatTime={formatTime} />}
    </KeyboardAvoidingView>
  );
};

export default Index;
