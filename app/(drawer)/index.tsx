// Index.tsx

import React, { useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, View, Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import TimerControls from "@/components/TimerControls";
import TimerDisplay from "@/components/TimerDisplay";
import TimerInput from "@/components/TimerInput";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { useTimer } from "@/hooks/useTimer";
import { addSession } from "@/redux/slices/xpSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { defaultBlurhash, rankBlurhashes } from "@/constants/rankBlurhashes";
import { rankBackgrounds } from "@/constants/rankBackgrounds";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const colors: string[] = Colors.colorArray;
const firstUnfilledColor = Colors.firstUnfilledColor;

const Index: React.FC = () => {
  const { usePlainBackground } = useSelector(
    (state: RootState) => state.settings
  );
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

  const currentColor: string = colors[lapCount % colors.length];
  const previousColor: string =
    lapCount === 0
      ? firstUnfilledColor
      : colors[(lapCount - 1) % colors.length];
  const progress = fixedTime === 0 ? 0 : (elapsedTime % fixedTime) / fixedTime;

  const xp = useSelector((state: RootState) => state.xp.xp);
  const rank = useSelector((state: RootState) => state.xp.rank);

  const backgroundImageSource =
    rankBackgrounds[rank] || rankBackgrounds["Peasant"];
  const backgroundBlurhash = rankBlurhashes[rank] || defaultBlurhash;

  const previousLapCountRef = useRef<number>(lapCount);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lapCount > previousLapCountRef.current) {
      const lastLapDuration = fixedTime;
      dispatch(addSession({ sessionLength: lastLapDuration }));
      previousLapCountRef.current = lapCount;
    }
  }, [lapCount]);

  const handleReset = () => {
    reset();
    previousLapCountRef.current = 0;
  };

  const handleSessionComplete = () => {
    dispatch(addSession({ sessionLength: 1500 })); // Example: 25 minutes
  };

  return (
    <SafeAreaView style={styles.container}>
      {!usePlainBackground && (
        <Image
          style={styles.backgroundImage}
          source={backgroundImageSource}
          placeholder={{ blurhash: backgroundBlurhash }}
          contentFit="cover"
          transition={1000}
        />
      )}

      <Header rank={rank} xp={xp} onCompleteSession={handleSessionComplete} />

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

      <View style={styles.footer}>
        <TimerControls
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={handleReset}
        />
      </View>

      {!usePlainBackground && (
        <>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.3)"]}
            style={styles.topShadow}
            pointerEvents="none"
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
          />
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
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    marginBottom: moderateScale(20),
    zIndex: 2,
  },
  topShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 1,
  },
  bottomShadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 1,
  },
});

export default Index;
