// components/DrawerToggle.tsx

import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useDrawerStatus } from "@react-navigation/drawer";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { moderateScale } from "react-native-size-matters";

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);
const AnimatedSimpleLineIcons =
  Animated.createAnimatedComponent(SimpleLineIcons);

const DrawerToggle: React.FC<{ navigation: any }> = ({ navigation }) => {
  const drawerStatus = useDrawerStatus();
  const isDrawerOpen = drawerStatus === "open";

  // Shared value for animation
  const animation = useSharedValue(0);

  useEffect(() => {
    // Animate to 1 when drawer is open, and to 0 when closed
    animation.value = withTiming(isDrawerOpen ? 1 : 0, { duration: 300 });
  }, [isDrawerOpen]);

  // Animated style for the "menu" icon
  const menuStyle = useAnimatedStyle(() => {
    return {
      opacity: 1 - animation.value,
      transform: [
        {
          rotate: `${animation.value * 90}deg`, // Optional rotation
        },
      ],
    };
  });

  // Animated style for the "close" icon
  const closeStyle = useAnimatedStyle(() => {
    return {
      opacity: animation.value,
      transform: [
        {
          rotate: `${(1 - animation.value) * 90}deg`, // Optional rotation
        },
      ],
    };
  });

  return (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
      style={styles.hamburgerContainer}
      accessibilityLabel="Toggle Drawer"
      accessibilityRole="button"
    >
      {/* Menu Icon */}
      <AnimatedSimpleLineIcons
        name="menu"
        size={24}
        color={Colors.secondary}
        style={[styles.icon, menuStyle]}
      />
      {/* Close Icon */}
      <AnimatedIonicons
        name="close"
        size={24}
        color={Colors.secondary}
        style={[styles.icon, closeStyle, styles.closeIcon]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hamburgerContainer: {
    marginLeft: moderateScale(10),
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Android shadow
    elevation: 5,
  },
  icon: {
    position: "absolute",
  },
  closeIcon: {
    // Ensure the close icon is on top
  },
});

export default DrawerToggle;
