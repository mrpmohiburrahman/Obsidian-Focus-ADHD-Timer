import { StyleSheet, View } from "react-native";
import React, { FC, useCallback } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SCREEN_WIDTH } from "../../constants/screen";
import { moderateScale } from "react-native-size-matters";

const SIZE = 8;

type Props = {
  scrollX: Animated.SharedValue<number>;
  itemsLength: number;
};

const Paginator: FC<Props> = ({ scrollX, itemsLength }) => {
  const inputRange = new Array(itemsLength)
    .fill("")
    .map((_, i) => i * SCREEN_WIDTH);

  const getDotAnimatedStyle = useCallback(
    (index: number) => {
      const outputRange = new Array(itemsLength)
        .fill("")
        .map((_, i) => (i === index ? SIZE * 2 : SIZE));
      return useAnimatedStyle(() => {
        const dotWidth = interpolate(
          scrollX.value,
          inputRange,
          outputRange,
          Extrapolate.CLAMP
        );
        return {
          width: dotWidth,
          borderRadius: dotWidth / 2,
        };
      });
    },
    [scrollX.value, inputRange, itemsLength]
  );

  return (
    <View style={[styles.container]}>
      {new Array(itemsLength).fill("").map((_, index) => {
        return (
          <Animated.View
            key={index}
            style={[styles.item, getDotAnimatedStyle(index)]}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    // borderWidth: 1,
    borderColor: "red",
    width: SCREEN_WIDTH,
    // width: moderateScale(120),
    alignSelf: "flex-end",
    position: "absolute",
    bottom: moderateScale(50),
    // marginBottom: moderateScale(20),
  },
  item: {
    marginHorizontal: 4,
    height: SIZE,
    borderRadius: SIZE,
    backgroundColor: "#B9B7C7",
  },
});
