// RootLayout.tsx

import React from "react";
import "react-native-reanimated";

import { Slot, Stack } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
