import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Button,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Image } from "expo-image";
import TimerControls from "@/components/TimerControls";
import TimerDisplay from "@/components/TimerDisplay";
import TimerInput from "@/components/TimerInput";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { useTimer } from "@/hooks/useTimer";
import { addSession } from "@/redux/slices/xpSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getBackgrundAndHashs } from "@/utils/getBackgrundAndHashs";
import BackgroundShadows from "@/components/BackgroundShadows";
import { playSoundForDuration, stopSound } from "@/hooks/SoundPlayer";
import { resetOnboardingState } from "@/redux/slices/onboardingSlice";

const { height: WINDOW_HEIGHT } = Dimensions.get("window");

const colors: string[] = Colors.colorArray;
const firstUnfilledColor = Colors.firstUnfilledColor;

const Index: React.FC = () => {
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

  const {
    usePlainBackground,
    playSoundAfterFirstSession,
    stopAfterFirstSession, // Get stopAfterFirstSession from settings
  } = useSelector((state: RootState) => state.settings);

  const { backgroundImageSource, backgroundBlurhash } = getBackgrundAndHashs();

  const previousLapCountRef = useRef<number>(lapCount);
  const dispatch = useDispatch();

  // Ref to track if sound has already been played for this session
  const soundPlayedRef = useRef<boolean>(false);

  useEffect(() => {
    // Check if lapCount increased, indicating a new session has ended
    if (lapCount > previousLapCountRef.current) {
      const lastLapDuration = fixedTime;
      dispatch(addSession({ sessionLength: lastLapDuration }));
      previousLapCountRef.current = lapCount;

      // Play sound only after the first session ends and only if notifications are enabled
      if (!soundPlayedRef.current && playSoundAfterFirstSession) {
        playSoundForDuration(10); // Play sound for 10 seconds
        soundPlayedRef.current = true; // Ensure sound only plays once
      }

      // If stopAfterFirstSession is enabled, stop the timer after the first session
      if (stopAfterFirstSession) {
        pause();
      }
    }
  }, [lapCount, fixedTime, playSoundAfterFirstSession, stopAfterFirstSession]); // Added stopAfterFirstSession dependency

  const handleReset = () => {
    reset();
    previousLapCountRef.current = 0;
    soundPlayedRef.current = false; // Reset sound play state when timer is reset
    stopSound(); // Stop the sound if playing
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

      <Header rank={rank} xp={xp} />
      {/* <Button
        title="resetOnboardingState"
        onPress={() => {
          dispatch(resetOnboardingState());
        }}
      /> */}
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

      {!usePlainBackground && <BackgroundShadows />}
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
});

export default Index;
