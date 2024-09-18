import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import OnboardingItem from "./components/onboarding/OnboardingItem";
import { screens } from "./data/onboarding";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants/screen";
import Paginator from "./components/onboarding/Paginator";
import CircularButton from "./components/onboarding/CircularButton";
import { ImageBackground } from "expo-image";
import { onboardingBlurhash } from "@/constants/rankBlurhashes";
import { moderateScale } from "react-native-size-matters";
import { useOnboard } from "@/context/onboardingContext";

const MAX_LENGTH = screens.length;

const Onboarding = () => {
  const { completeOnboarding } = useOnboard();

  const aref = useAnimatedRef<Animated.ScrollView>();
  const [index, setIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
    runOnJS(setIndex)(Math.round(event.contentOffset.x / SCREEN_WIDTH));
  });

  const onPressButton = () => {
    if (index < MAX_LENGTH - 1) {
      aref.current?.scrollTo({
        x: SCREEN_WIDTH * (index + 1),
        y: 0,
        animated: true,
      });
      setIndex(index + 1);
    } else {
      completeOnboarding();
    }
  };

  return (
    <ImageBackground
      source={require(`@/assets/onboarding/glassmorphism.png`)}
      style={styles.background}
      placeholder={{ blurhash: onboardingBlurhash }}
      contentFit="cover"
      transition={1000}
    >
      <Animated.ScrollView
        onScroll={scrollHandler}
        ref={aref}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        pagingEnabled
        style={styles.scrollView}
      >
        {screens.map((screen, index) => (
          <OnboardingItem screen={screen} key={index.toString()} />
        ))}
      </Animated.ScrollView>
      <View>
        <Paginator itemsLength={screens.length} scrollX={scrollX} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={completeOnboarding}
          >
            <Text style={styles.skipText}>skip</Text>
          </TouchableOpacity>
          <CircularButton
            screensLength={screens.length}
            onPress={onPressButton}
            index={index}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "#0553",
  },
  scrollView: {
    backgroundColor: "transparent",
    height: 200,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: moderateScale(50),
  },
  buttonContainer: {
    borderColor: "red",
    overflow: "hidden",
    backgroundColor: "transparent",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 40,
    position: "absolute",
    bottom: moderateScale(50),
    width: SCREEN_WIDTH,
  },
  skipButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
  },
  skipText: {
    color: "#EBEBF5",
  },
});

export default Onboarding;
