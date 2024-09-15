// Index.tsx

import TimerControls from "@/components/TimerControls";
import TimerDisplay from "@/components/TimerDisplay";
import TimerInput from "@/components/TimerInput";
import { Colors } from "@/constants/Colors";
import { useTimer } from "@/hooks/useTimer";
import { addSession } from "@/redux/slices/xpSlice";
import { RootState } from "@/redux/store";
import React, { useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

import { useDispatch, useSelector } from "react-redux";

type IndexProps = {};

const colors: string[] = Colors.colorArray;
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

  // Get XP and Rank from Redux store
  const xp = useSelector((state: RootState) => state.xp.xp);
  const rank = useSelector((state: RootState) => state.xp.rank);

  // const xpState = useSelector((state: RootState) => state.xp);
  // console.log("🚀 ~ xpState:", xpState);

  // Reference to keep track of previous lap count
  const previousLapCountRef = useRef<number>(lapCount);

  // Dispatch to send actions to the store
  const dispatch = useDispatch();
  // UseEffect to update XP and Rank when a new lap is completed
  useEffect(() => {
    if (lapCount > previousLapCountRef.current) {
      // A new lap has been completed
      const lastLapDuration = fixedTime; // Duration of the completed session

      // Dispatch addSession action with the session length
      dispatch(addSession({ sessionLength: lastLapDuration }));

      // Update the previous lap count
      previousLapCountRef.current = lapCount;
    }
  }, [lapCount]);

  // Handle reset to reset previous lap count reference
  const handleReset = () => {
    reset();
    previousLapCountRef.current = 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button
        title="reset to initial state"
        onPress={() => {
          dispatch(resetXpState());
        }}
      /> */}
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Focus Quest</Text>
        {/* XP and Rank Display */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Rank: {rank}</Text>
          <Text style={styles.statusText}>XP: {xp}</Text>
        </View>
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
          onReset={handleReset} // Use handleReset to reset lap count
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
  // Styles for XP and Rank display
  statusContainer: {
    marginTop: moderateScale(10),
    alignItems: "center",
  },
  statusText: {
    fontSize: moderateScale(16),
    color: "#FFFFFF",
    fontWeight: "500",
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
