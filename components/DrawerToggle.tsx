// components/DrawerToggle.tsx

import { SimpleLineIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";

const DrawerToggle: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <BlurView
      intensity={80}
      // tint="systemUltraThinMaterialLight"
      tint="dark"
      style={{
        height: moderateScale(30),
        width: moderateScale(40),
        paddingRight: 5,

        justifyContent: "center",
        alignItems: "flex-end",
        overflow: "hidden",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{
          width: moderateScale(24),
          height: moderateScale(24),
          justifyContent: "center",
          alignItems: "center",
        }}
        accessibilityLabel="Toggle Drawer"
        accessibilityRole="button"
      >
        {/* Menu Icon */}
        <SimpleLineIcons name="menu" size={24} color={"white"} />
      </TouchableOpacity>
    </BlurView>
  );
};

export default DrawerToggle;
