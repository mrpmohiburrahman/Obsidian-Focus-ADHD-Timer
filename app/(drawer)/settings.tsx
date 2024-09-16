import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  StyleSheet,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Colors } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import {
  toggleNotification,
  toggleStopwatch,
  togglePlainBackground,
} from "@/redux/slices/settingsSlice";

const Settings = () => {
  const dispatch = useDispatch();

  const {
    notificationsEnabled,
    continueAsStopwatch,
    usePlainBackground,
  } = useSelector((state: RootState) => state.settings);

  const settingsData = [
    {
      id: "1",
      title: "Enable Notification",
      value: notificationsEnabled,
      action: toggleNotification,
    },
    {
      id: "2",
      title: "Continue as Stopwatch After Focus Ends",
      value: continueAsStopwatch,
      action: toggleStopwatch,
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={settingsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
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
