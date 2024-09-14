// app/_layout.tsx

import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer screenOptions={{}}>
          <Drawer.Screen
            name="(drawer)/index" // Ensure this matches your screen's file name
            options={{
              drawerLabel: "Timer",
              title: "Timer Title",
            }}
          />
          <Drawer.Screen
            name="(drawer)/history" // Ensure this matches your screen's file name
            options={{
              drawerLabel: "History",
              title: "History Title",
            }}
          />
          <Drawer.Screen
            name="(drawer)/settings" // Ensure this matches your screen's file name
            options={{
              drawerLabel: "Settings",
              title: "Settings Title",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
