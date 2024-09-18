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
// import CircularButton from "../components/onboarding/CircularButton";

import OnboardingItem from "./components/onboarding/OnboardingItem";
import { screens } from "./data/onboarding";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants/screen";
import Paginator from "./components/onboarding/Paginator";
import CircularButton from "./components/onboarding/CircularButton";
import { ImageBackground } from "expo-image";
import { onboardingBlurhash } from "@/constants/rankBlurhashes";
import { moderateScale } from "react-native-size-matters";
const MAX_LENGHT = screens.length;
const Onboarding = () => {
  const aref = useAnimatedRef<Animated.ScrollView>();
  const [index, setIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
    runOnJS(setIndex)(Math.round(event.contentOffset.x / SCREEN_WIDTH));
  });
  const onPressButton = () => {
    if (index !== MAX_LENGHT - 1) {
      aref.current?.scrollTo({
        x: index > 0 ? SCREEN_WIDTH * (index + 1) : SCREEN_WIDTH,
        y: 0,
        animated: true,
      });
      setIndex(index + 1);
    }
  };
  return (
    <ImageBackground
      source={require(`@/assets/onboarding/glassmorphism.png`)}
      style={{
        flex: 1,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: "#0553",
      }}
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
        style={{
          // borderWidth: 1,
          borderColor: "red",
          backgroundColor: "transparent",
          height: 200,
        }}
      >
        {screens.map((screen, index) => {
          return <OnboardingItem screen={screen} key={index.toString()} />;
        })}
      </Animated.ScrollView>
      <View>
        <Paginator itemsLength={screens.length} scrollX={scrollX} />
        <View
          style={{
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
          }}
        >
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              justifyContent: "center",
            }}
            onPress={()=>{
              
            }}
          >
            <Text style={{ color: "#EBEBF5" }}>skip</Text>
          </TouchableOpacity>
          <CircularButton
            screensLenght={screens.length}
            onPress={onPressButton}
            index={index}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Onboarding;
