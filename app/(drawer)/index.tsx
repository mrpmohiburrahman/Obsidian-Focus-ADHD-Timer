// Index.tsx

import React, { useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import TimerControls from "@/components/TimerControls";
import TimerDisplay from "@/components/TimerDisplay";
import TimerInput from "@/components/TimerInput";
import { Colors } from "@/constants/Colors";
import { useTimer } from "@/hooks/useTimer";
import { addSession } from "@/redux/slices/xpSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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
      <Image
        style={styles.backgroundImage}
        source={require("@/assets/images/king.png")}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />

      <BlurView
        intensity={40}
        tint="systemUltraThinMaterialLight"
        style={styles.blurView}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Focus Quest</Text>
          {/* XP and Rank Display */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Rank: {rank}</Text>
            <Text style={styles.statusText}>XP: {xp}</Text>
          </View>
        </View>
      </BlurView>

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

      {/* Gradient Shadows */}
      {/* Top Shadow */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.3)"]}
        style={styles.topShadow}
        pointerEvents="none"
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
      />

      {/* Bottom Shadow */}
      <LinearGradient
        colors={[
          "rgba(0,0,0,0.7)",
          "rgba(0,0,0,0.5)",
          "rgba(0,0,0,0.3)",
          "transparent",
        ]}
        style={styles.bottomShadow}
        pointerEvents="none"
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.background, // Dark background
    padding: moderateScale(20),
    justifyContent: "space-between",
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: WINDOW_HEIGHT,
    width: "100%",
    backgroundColor: "#0553",
  },
  blurView: {
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(40),
    paddingVertical: moderateScale(20),
  },
  header: {
    alignItems: "center",
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
    marginBottom: moderateScale(20), // Adjusted to fit within shadows
    zIndex: 2,
  },
  topShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200, // Increased height from 50 to 100
    zIndex: 1, // Ensure shadow is above other components
  },
  bottomShadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    // borderWidth: 1,
    borderColor: "red",
    // No need for backgroundColor or shadow properties as LinearGradient handles it
    zIndex: 1, // Ensure shadow is above other components
  },
});

export default Index;
