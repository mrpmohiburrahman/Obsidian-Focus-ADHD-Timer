import { BlurView } from "expo-blur";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

interface HeaderProps {
  rank: string;
  xp: number;
}

const Header: React.FC<HeaderProps> = ({ rank, xp }) => (
  <BlurView
    intensity={80}
    tint="systemUltraThinMaterialDark"
    style={styles.blurView}
  >
    <View style={styles.header}>
      <Text style={styles.title}>Focus Quest</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Rank: {rank}</Text>
        <Text style={styles.statusText}>XP: {xp}</Text>
      </View>
    </View>
  </BlurView>
);

const styles = StyleSheet.create({
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
  statusContainer: {
    marginTop: moderateScale(10),
    alignItems: "center",
  },
  statusText: {
    fontSize: moderateScale(16),
    color: "#FFFFFF",
    fontWeight: "500",
  },
});

export default Header;
