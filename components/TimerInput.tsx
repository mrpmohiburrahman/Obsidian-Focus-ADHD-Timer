
// components/TimerInput.tsx

import React from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";

type TimerInputProps = {
  inputValue: string;
  onChange: (value: string) => void;
};

const TimerInput: React.FC<TimerInputProps> = ({ inputValue, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Set Fixed Time (MM:SS or SS):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={onChange}
        placeholder="MM:SS or SS"
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderColor: "#333333",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: "#FFFFFF",
    backgroundColor: "#1E1E1E",
  },
});

export default TimerInput;