// Index.tsx

import TimerControls from "@/components/TimerControls";
import TimerDisplay from "@/components/TimerDisplay";
import TimerInput from "@/components/TimerInput";
import { Colors } from "@/constants/Colors";
import { useTimer } from "@/hooks/useTimer";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

type IndexProps = {};

// Define color palette inside the main component for consistent access
const colors: string[] = Colors.colorArray;

// Adjusted unfilled color for the first session
const firstUnfilledColor = Colors.firstUnfilledColor; // Slightly lighter than the background

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

  // Calculate current and previous colors
  const currentColor: string = colors[lapCount % colors.length];
  const previousColor: string =
    lapCount === 0
      ? firstUnfilledColor
      : colors[(lapCount - 1) % colors.length];

  // Calculate progress for the current interval
  const progress = fixedTime === 0 ? 0 : (elapsedTime % fixedTime) / fixedTime;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Focus Quest</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <TimerDisplay
          progress={progress}
          color={currentColor}
          unfilledColor={previousColor}
          elapsedTime={elapsedTime}
          isAnimated={isAnimated}
        />

        <TimerInput fixedTime={fixedTime} setFixedTime={setFixedTime} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TimerControls
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={reset}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Dark background
    padding: moderateScale(20),
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(24),
    color: "#FFFFFF", // White text
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    marginBottom: moderateScale(80),
  },
});

export default Index;
