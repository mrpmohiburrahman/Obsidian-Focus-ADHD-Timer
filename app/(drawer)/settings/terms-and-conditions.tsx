// app/settings/index.js

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Terms and Conditions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.background,
    padding: 16,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  text: {
    fontSize: 16,
  },
});
