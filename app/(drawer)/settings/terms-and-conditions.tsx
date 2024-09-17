import React from "react";
import { SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors"; // Adjust the path based on your project structure

const TermsAndConditions = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Terms and Conditions</Text>
        <Text style={styles.text}>
          Welcome to ObsidianFocus. By downloading or using the app, you agree
          to be bound by the following terms and conditions. Please read them
          carefully before using the app.
        </Text>
        <Text style={styles.subHeader}>License</Text>
        <Text style={styles.text}>
          We grant you a non-transferable, non-exclusive license to use the
          ObsidianFocus app for personal and non-commercial purposes. You may
          not modify, copy, distribute, transmit, or create derivative works of
          the app.
        </Text>
        <Text style={styles.subHeader}>User Responsibilities</Text>
        <Text style={styles.text}>
          You agree to use the app only for lawful purposes and in a manner that
          does not infringe the rights of, or restrict the use of, the app by
          any other party.
        </Text>
        {/* Add more sections as needed */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollViewContent: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
});

export default TermsAndConditions;
