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

        <Text style={styles.subHeader}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By accessing and using the ObsidianFocus app, you agree to comply with
          and be bound by these Terms and Conditions. If you do not agree to
          these terms, please do not use the app.
        </Text>

        <Text style={styles.subHeader}>2. License to Use</Text>
        <Text style={styles.text}>
          We grant you a non-transferable, non-exclusive license to use
          ObsidianFocus for personal, non-commercial purposes only. You may not
          modify, copy, distribute, transmit, display, perform, reproduce,
          publish, license, create derivative works from, transfer, or sell any
          information, software, products, or services obtained from the app.
        </Text>

        <Text style={styles.subHeader}>3. User Responsibilities</Text>
        <Text style={styles.text}>
          You agree to use the app only for lawful purposes and in a way that
          does not infringe the rights of others or restrict their use of the
          app. You agree not to: - Use the app in any way that violates any
          applicable laws or regulations. - Attempt to gain unauthorized access
          to any parts of the app, other users' accounts, or any systems or
          networks connected to the app.
        </Text>

        <Text style={styles.subHeader}>4. Intellectual Property</Text>
        <Text style={styles.text}>
          All content, features, and functionality (including but not limited to
          all information, software, text, displays, images, video, and audio)
          contained in the app are owned by ObsidianFocus, its licensors, or
          other providers of such material and are protected by intellectual
          property laws. You are not granted any rights to use these materials
          without explicit permission.
        </Text>

        <Text style={styles.subHeader}>5. Limitation of Liability</Text>
        <Text style={styles.text}>
          ObsidianFocus is provided on an "as is" and "as available" basis. We
          make no warranties, express or implied, regarding the app's operation,
          functionality, or availability. To the fullest extent permitted by
          law, we disclaim all liability for any direct, indirect, incidental,
          consequential, or punitive damages arising out of your use of the app.
        </Text>

        <Text style={styles.subHeader}>6. Termination</Text>
        <Text style={styles.text}>
          We reserve the right to suspend or terminate your access to the app at
          any time for any reason, including but not limited to a breach of
          these Terms and Conditions.
        </Text>

        <Text style={styles.subHeader}>7. Changes to the Terms</Text>
        <Text style={styles.text}>
          We reserve the right to modify these Terms and Conditions at any time.
          Your continued use of the app following the posting of any changes
          will mean that you accept and agree to the modified terms.
        </Text>

        <Text style={styles.subHeader}>8. Governing Law</Text>
        <Text style={styles.text}>
          These Terms and Conditions are governed by and construed in accordance
          with the laws of [Your Country/State]. Any disputes related to these
          terms will be resolved exclusively in the courts located within [Your
          Jurisdiction].
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

export default TermsAndConditions;
