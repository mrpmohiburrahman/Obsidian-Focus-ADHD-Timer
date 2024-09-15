import React, { useEffect } from "react";
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

import { ImageBackground, StyleSheet, View } from "react-native";
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
              screenOptions={{
                headerTintColor: Colors.primary,
                headerStyle: {
                  backgroundColor: "transparent",
                },
                headerTransparent: true,
                headerShadowVisible: false,
                drawerStyle: {
                  backgroundColor: "transparent",
                },
                sceneContainerStyle: {
                  backgroundColor: "transparent",
                },
                drawerActiveBackgroundColor: Colors.secondary,
                drawerInactiveBackgroundColor:
                  Colors.drawerInactiveBackgroundColor,
                drawerActiveTintColor: Colors.drawerActiveTintColor,
                drawerInactiveTintColor: Colors.drawerInactiveTintColor,
              }}
            >
              <Drawer.Screen
                name="(drawer)/index"
                options={{
                  drawerLabel: "Timer",
                  title: "",
                  // headerLeft: () => (
                  //   <View style={styles.hamburgerContainer}>
                  //     <HamburgerIcon /> {/* Replace with actual icon */}
                  //   </View>
                  // ),
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

          {/* Shadows for Top and Bottom */}
          {/* <View style={styles.topShadow} pointerEvents="none" /> */}
          {/* <View style={styles.bottomShadow} pointerEvents="none" /> */}
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "space-between",
  },
  hamburgerContainer: {
    marginLeft: moderateScale(10),
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Android shadow
    elevation: 5,
  },
  topShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Android shadow
    elevation: 5,
    backgroundColor: "transparent",
  },
  bottomShadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Android shadow
    elevation: 5,
    backgroundColor: "transparent",
  },
});
