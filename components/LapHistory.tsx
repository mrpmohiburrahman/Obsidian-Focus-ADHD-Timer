
// components/LapHistory.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";

type LapHistoryProps = {
  laps: number[];
  formatTime: (timeInSeconds: number) => string;
};

const LapHistory: React.FC<LapHistoryProps> = ({ laps, formatTime }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lap History:</Text>
      {laps.map((lapTime, index) => (
        <Text key={index} style={styles.lapText}>
          Lap {index + 1}: {formatTime(lapTime)}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1E1E1E",
    borderRadius: 5,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  lapText: {
    color: "#BBBBBB",
    fontSize: 14,
    marginBottom: 2,
  },
});

export default LapHistory;