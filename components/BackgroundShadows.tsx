import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";

const BackgroundShadows = () => {
  return (
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
  );
};

export default BackgroundShadows;

const styles = StyleSheet.create({
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
