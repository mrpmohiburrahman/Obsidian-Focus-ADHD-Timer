import React from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Colors } from "@/constants/Colors";
import { plainBackground } from "@/constants/rankBackgrounds";
import {
  togglePlainBackground,
  togglePlaySoundAfterFirstSession,
  toggleStopAfterFirstSession, // Updated import
} from "@/redux/slices/settingsSlice";
import { RootState } from "@/redux/store";
import { getBackgrundAndHashs } from "@/utils/getBackgrundAndHashs";
import { Image } from "expo-image";
import { moderateScale } from "react-native-size-matters";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const Settings = () => {
  const dispatch = useDispatch();

  const {
    playSoundAfterFirstSession,
    stopAfterFirstSession,
    usePlainBackground,
  } = useSelector((state: RootState) => state.settings);

  const settingsData = [
    {
      id: "1",
      title: "Play Sound After First Session", // Updated title
      value: playSoundAfterFirstSession, // Updated state
      action: togglePlaySoundAfterFirstSession, // Updated action
    },
    {
      id: "2",
      title: "Stop Timer After First Session",
      value: stopAfterFirstSession, // Updated state
      action: toggleStopAfterFirstSession, // Updated action
    },
    {
      id: "3",
      title: "Use Plain Background Color",
      value: usePlainBackground,
      action: togglePlainBackground,
    },
  ];

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.option}>
        <Text style={styles.optionText}>{item.title}</Text>
        <Switch
          value={item.value}
          onValueChange={() => {
            dispatch(item.action());
          }}
          trackColor={{ false: "#767577", true: Colors.primary }}
        />
      </View>
    );
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
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
    color: Colors.text,
  },
});

export default Settings;
