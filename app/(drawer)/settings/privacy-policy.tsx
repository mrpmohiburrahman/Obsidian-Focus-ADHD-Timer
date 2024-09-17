import React from "react";
import { SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors"; // Adjust the path based on your project structure

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Privacy Policy</Text>
        <Text style={styles.text}>
          We respect your privacy and are committed to protecting the personal
          information you share with us through the ObsidianFocus app. This
          privacy policy explains how we collect, use, and protect your data.
        </Text>
        <Text style={styles.subHeader}>Information We Collect</Text>
        <Text style={styles.text}>
          We do not collect any personally identifiable information unless you
          voluntarily provide it to us, such as through user feedback or email
          correspondence.
        </Text>
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

export default PrivacyPolicy;
