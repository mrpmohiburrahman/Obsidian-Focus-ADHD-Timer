// RootLayout.tsx

import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Colors } from "@/constants/Colors";

import CustomDrawerContent from "@/components/CustomDrawerContent"; // Import the CustomDrawerContent component
import DrawerToggle from "@/components/DrawerToggle"; // Import the DrawerToggle component
import { StyleSheet } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          drawerInactiveBackgroundColor: Colors.drawerInactiveBackgroundColor,
          drawerActiveTintColor: Colors.drawerActiveTintColor,
          drawerInactiveTintColor: Colors.drawerInactiveTintColor,
          // Customize the headerLeft component
          headerLeft: () => <DrawerToggle navigation={navigation} />,
        })}
        drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom Drawer content
      >
        {/* Settings Screen */}
        {/* Timer Screen */}
        <Drawer.Screen
          name="(drawer)/index"
          options={{
            drawerLabel: "Timer",
            title: "",
            // Inherit default header options
          }}
        />

        {/* History Screen with Customized Header */}
        <Drawer.Screen
          name="(drawer)/history"
          options={{
            drawerLabel: "History",
            title: "History",
            // headerStyle: {
            //   backgroundColor: Colors.background, // Custom background color for History header
            // },
            headerTintColor: "#FFFFFF", // Custom text/icon color for History header
            // headerTransparent: false, // Make header opaque to apply background color
          }}
        />
        <Drawer.Screen
          name="(drawer)/settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
            // headerStyle: {
            //   backgroundColor: Colors.background, // Custom background color for History header
            // },
            headerTintColor: "#FFFFFF", // Custom text/icon color for History header
            // headerTransparent: false, // Make header opaque to apply background color
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  // Define any necessary styles here
});
