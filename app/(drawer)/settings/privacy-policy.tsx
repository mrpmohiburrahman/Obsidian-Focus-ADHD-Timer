
// app/settings/privacy-policy.js

import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function PrivacyPolicy() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.content}>
        {/* Insert your Privacy Policy content here */}
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use [Your App Name]...
      </Text>
      {/* Add more sections as needed */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});