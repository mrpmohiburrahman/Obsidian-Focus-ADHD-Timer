// Index.tsx

import LapHistory from "@/components/LapHistory";
import TimerControls from "@/components/TimerControls";
import TimerDisplay from "@/components/TimerDisplay";
import TimerInput from "@/components/TimerInput";
import { useTimer } from "@/hooks/useTimer";
import { formatTime } from "@/utils/formatTime";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

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

  const [inputValue, setInputValue] = useState<string>("5"); // Initial input value

  const handleInputChange = (text: string): void => {
    setInputValue(text);
    // Handle setting fixed time with validation inside useTimer
    const timeParts = text.split(":").map((part) => parseInt(part, 10));
    let totalSeconds = 0;

    if (timeParts.length === 2) {
      const [minutes, seconds] = timeParts;
      if (
        !isNaN(minutes) &&
        !isNaN(seconds) &&
        seconds < 60 &&
        minutes >= 0 &&
        seconds >= 0
      ) {
        totalSeconds = minutes * 60 + seconds;
      }
    } else if (timeParts.length === 1) {
      const [seconds] = timeParts;
      if (!isNaN(seconds) && seconds > 0) {
        totalSeconds = seconds;
      }
    }

    if (totalSeconds > 0) {
      setFixedTime(totalSeconds);
    }
  };

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
  const progress = (elapsedTime % fixedTime) / fixedTime;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Timer App</Text>

      <TimerInput inputValue={inputValue} onChange={handleInputChange} />

      <TimerDisplay
        progress={progress}
        color={currentColor}
        unfilledColor={previousColor}
        elapsedTime={elapsedTime}
        isAnimated={isAnimated}
      />

      <TimerControls
        isRunning={isRunning}
        onStart={start}
        onPause={pause}
        onReset={reset}
      />

      <Text style={styles.infoText}>Fixed Time: {formatTime(fixedTime)}</Text>

      <Text style={styles.infoText}>Completed Intervals: {lapCount}</Text>

      {laps.length > 0 && <LapHistory laps={laps} formatTime={formatTime} />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212", // Dark background
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 40,
    color: "#FFFFFF", // White text
    fontWeight: "bold",
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
    color: "#BBBBBB",
    marginTop: 10,
  },
});

export default Index;
