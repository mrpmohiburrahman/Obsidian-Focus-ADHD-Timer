// components/CustomDrawerContent.tsx

import { Colors } from "@/constants/Colors";
import { defaultBlurhash } from "@/constants/rankBlurhashes";
import { RootState } from "@/redux/store";
import { getBackgrundAndHashs } from "@/utils/getBackgrundAndHashs";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { BlurView } from "expo-blur"; // Import BlurView
import { Image } from "expo-image";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
const CustomDrawerContent = (props) => {
  const inset = useSafeAreaInsets();

  const { usePlainBackground } = useSelector(
    (state: RootState) => state.settings
  );

  const { backgroundBlurhash } = getBackgrundAndHashs();
  const backgroundBlur = usePlainBackground
    ? defaultBlurhash
    : backgroundBlurhash;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Image
        style={styles.backgroundImage}
        placeholder={{ blurhash: backgroundBlur }}
        contentFit="cover"
        transition={1000}
      />

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
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: WINDOW_HEIGHT,
    width: "100%",
    backgroundColor: "#0553",
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
