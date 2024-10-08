import React from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Href, useRouter } from "expo-router"; // Import useRouter for navigation
import { Colors } from "@/constants/Colors";
import { plainBackground } from "@/constants/rankBackgrounds";
import {
  togglePlainBackground,
  togglePlaySoundAfterFirstSession,
  toggleStopAfterFirstSession,
} from "@/redux/slices/settingsSlice";
import { RootState } from "@/redux/store";
import { getBackgrundAndHashs } from "@/utils/getBackgrundAndHashs";
import { Image } from "expo-image";
import { moderateScale } from "react-native-size-matters";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons"; // You can use any icon library here

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

// Define a TypeScript type for settings items (optional but recommended)
type SettingsItem =
  | {
      id: string;
      title: string;
      icon: React.ReactNode; // Add icon as a part of the settings item
      type: "switch";
      value: boolean;
      action: () => any; // Update: action should return an action object
    }
  | {
      id: string;
      title: string;
      icon: React.ReactNode; // Add icon as a part of the settings item
      type: "navigation";
      route: Href;
    };

const Settings = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize router

  const {
    playSoundAfterFirstSession,
    stopAfterFirstSession,
    usePlainBackground,
  } = useSelector((state: RootState) => state.settings);

  // Updated settingsData with two new navigation items and icons
  const settingsData: SettingsItem[] = [
    {
      id: "1",
      title: "Play Sound After First Session",
      icon: <Octicons name="bell" color={"white"} size={20} />, // Add your icon
      type: "switch",
      value: playSoundAfterFirstSession,
      action: togglePlaySoundAfterFirstSession,
    },
    {
      id: "2",
      title: "Stop Timer After First Session",
      icon: <Octicons name="stop" color={"white"} size={20} />, // Icon for stop action
      type: "switch",
      value: stopAfterFirstSession,
      action: toggleStopAfterFirstSession,
    },
    {
      id: "3",
      title: "Use Plain Background Color",
      icon: (
        <MaterialIcons name="invert-colors-off" color={"white"} size={20} />
      ), // Icon for background
      type: "switch",
      value: usePlainBackground,
      action: togglePlainBackground,
    },
    {
      id: "4",
      title: "Terms and Conditions",
      icon: <Ionicons name="document-lock-outline" color={"white"} size={20} />, // Icon for Terms
      type: "navigation",
      route: "/settings/terms-and-conditions",
    },
    {
      id: "5",
      title: "Privacy Policy",
      icon: <Octicons name="shield-lock" color={"white"} size={20} />, // Icon for Privacy
      type: "navigation",
      route: "/settings/privacy-policy",
    },
  ];

  // Updated renderItem to handle different types of settings with icons
  const renderItem = ({ item }: { item: SettingsItem }) => {
    if (item.type === "switch") {
      return (
        <View style={styles.option}>
          <View style={styles.optionLeft}>
            {item.icon}
            <Text style={styles.optionText}>{item.title}</Text>
          </View>
          <Switch
            value={item.value}
            onValueChange={() => {
              dispatch(item.action()); // Fixed: action is now invoked
            }}
            trackColor={{ false: "#767577", true: Colors.primary }}
          />
        </View>
      );
    } else if (item.type === "navigation") {
      return (
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push(item.route)} // Fixed: route is a string
        >
          <View style={styles.optionLeft}>
            {item.icon}
            <Text style={styles.optionText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const { backgroundImageSource } = getBackgrundAndHashs({ isGeneral: true });

  const backgroundImage = usePlainBackground
    ? plainBackground
    : backgroundImageSource;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={backgroundImage}
        contentFit="cover"
        transition={100}
      />

      <FlatList
        data={settingsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: moderateScale(60),
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: WINDOW_HEIGHT,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // Space between the icon and text
  },
  optionText: {
    fontSize: 18,
    color: Colors.text,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
});

export default Settings;
