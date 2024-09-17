import { Colors } from "@/constants/Colors";
import { useOnboard } from "@/context/onboardingContext";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
// import { useOnboard } from '@/context/OnboardContext';

export default function OnboardingPage1() {
  const { completeOnboarding } = useOnboard();

  const handleNext = () => {
    // Complete onboarding and navigate
    completeOnboarding();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Onboarding Page 1</Text>
      <Button title="Complete Onboarding" onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text,
    fontSize: 24,
  },
});
