// RootLayout.tsx

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Colors } from "@/constants/Colors";
import { persistor, store } from "../redux/store";

import DrawerToggle from "@/components/DrawerToggle"; // Import the DrawerToggle component
import CustomDrawerContent from "@/components/CustomDrawerContent"; // Import the CustomDrawerContent component
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

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
              screenOptions={({ navigation }) => ({
                headerTintColor: Colors.primary, // Default tint color
                headerStyle: {
                  backgroundColor: "transparent",
                },
                headerTransparent: true,
                headerShadowVisible: false,
                drawerStyle: {
                  backgroundColor: "transparent", // Make sure Drawer itself is transparent to show gradient
                },
                sceneContainerStyle: {
                  backgroundColor: "transparent",
                },
                drawerActiveBackgroundColor: Colors.secondary,
                drawerInactiveBackgroundColor:
                  Colors.drawerInactiveBackgroundColor,
                drawerActiveTintColor: Colors.drawerActiveTintColor,
                drawerInactiveTintColor: Colors.drawerInactiveTintColor,
                // Customize the headerLeft component
                headerLeft: () => <DrawerToggle navigation={navigation} />,
              })}
              drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom Drawer content
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
