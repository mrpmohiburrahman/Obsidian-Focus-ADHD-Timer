// app/_layout.tsx

import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
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

import { store, persistor } from "../redux/store";
import { Colors } from "@/constants/Colors";

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Drawer
              screenOptions={{
                headerTintColor: Colors.primary,
                headerStyle: {
                  backgroundColor: Colors.background,
                },
                headerShadowVisible: false,
                drawerStyle: {
                  backgroundColor: Colors.background,
                },
                sceneContainerStyle: {
                  backgroundColor: Colors.background,
                },
                drawerActiveBackgroundColor: "#3A3D42", // Adjusted background color
                drawerInactiveBackgroundColor: Colors.background,
                drawerActiveTintColor: "#FFFFFF",
                drawerInactiveTintColor: "#BBBBBB",
              }}
            >
              <Drawer.Screen
                name="(drawer)/index"
                options={{
                  drawerLabel: "Timer",
                  title: "",
                }}
              />
              <Drawer.Screen
                name="(drawer)/history"
                options={{
                  drawerLabel: "History",
                  title: "History",
                }}
              />
              <Drawer.Screen
                name="(drawer)/settings"
                options={{
                  drawerLabel: "Settings",
                  title: "Settings",
                }}
              />
            </Drawer>
          </ThemeProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
