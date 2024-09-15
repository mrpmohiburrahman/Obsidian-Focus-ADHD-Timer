// components/CustomDrawerContent.tsx

import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur"; // Import BlurView

const CustomDrawerContent = (props) => {
  const inset = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require("@/assets/images/drawerbg.png")} // Replace with the path to your background image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <BlurView intensity={50} style={styles.blurContainer}>
        {/* Optional: Add a header or avatar */}
        {/* <View style={styles.header}>
          <Image
            source={require("@/assets/images/duke.png")} // Replace with your avatar image
            style={styles.avatar}
          />
          <Text style={styles.username}>John Doe</Text>
        </View> */}
        <View style={{ paddingTop: inset.top }} />
        {/* Drawer Items */}
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={styles.scrollView}
        >
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    paddingTop: 50, // Adjust padding as needed
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomDrawerContent;
