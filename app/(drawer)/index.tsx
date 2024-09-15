// Index.tsx

import TimerControls from "@/components/TimerControls";
import TimerDisplay from "@/components/TimerDisplay";
import TimerInput from "@/components/TimerInput";
import { useTimer } from "@/hooks/useTimer";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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

        {/* Additional Information and Lap History */}
        {/* <View style={styles.extraInfo}>
          <Text style={styles.infoText}>
            Fixed Time: {formatTime(fixedTime)}
          </Text>

          <Text style={styles.infoText}>Completed Intervals: {lapCount}</Text>

          {laps.length > 0 && (
            <LapHistory laps={laps} formatTime={formatTime} />
          )}
        </View> */}
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
    backgroundColor: "#121212", // Dark background
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
  extraInfo: {
    marginTop: moderateScale(20),
    alignItems: "center",
  },
  infoText: {
    textAlign: "center",
    fontSize: moderateScale(16),
    color: "#BBBBBB",
    marginTop: moderateScale(10),
  },
  footer: {
    marginBottom: moderateScale(80),
  },
});

export default Index;
