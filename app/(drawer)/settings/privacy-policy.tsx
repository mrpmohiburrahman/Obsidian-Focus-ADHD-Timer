import React from "react";
import { SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors"; // Adjust the path based on your project structure

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Privacy Policy</Text>

        <Text style={styles.text}>
          At ObsidianFocus, we value your privacy and are committed to
          protecting your personal information. This privacy policy explains how
          we collect, use, and protect your data.
        </Text>

        <Text style={styles.subHeader}>1. Information We Collect</Text>
        <Text style={styles.text}>
          We collect the following information to provide a better experience
          while using our app: - Personal Information: We do not collect any
          personally identifiable information unless you voluntarily provide it
          to us, such as via feedback or email correspondence. - Usage Data:
          Non-personal information such as app usage, interactions, and
          preferences may be collected for analytics purposes to improve the
          app.
        </Text>

        <Text style={styles.subHeader}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          We use the collected information to: - Enhance and personalize your
          experience in the app. - Improve our app’s features and functionality.
          - Respond to your queries or feedback. - Communicate app updates, if
          necessary. We will not use or share your information for any purposes
          other than those outlined in this policy.
        </Text>

        <Text style={styles.subHeader}>3. Third-Party Services</Text>
        <Text style={styles.text}>
          We may use third-party service providers, such as analytics tools, to
          monitor and analyze the use of our app. These third-party services may
          have access to your data solely for the purpose of performing tasks on
          our behalf and are not authorized to disclose or use it for any other
          purposes.
        </Text>

        <Text style={styles.subHeader}>4. Data Security</Text>
        <Text style={styles.text}>
          We prioritize the security of your personal information and take all
          reasonable steps to protect it. However, no method of electronic
          storage or transmission over the internet is 100% secure. While we
          strive to protect your data, we cannot guarantee absolute security.
        </Text>

        <Text style={styles.subHeader}>5. Data Retention</Text>
        <Text style={styles.text}>
          We retain the information collected from you for as long as necessary
          to fulfill the purposes outlined in this privacy policy, comply with
          legal obligations, resolve disputes, and enforce our agreements.
        </Text>

        <Text style={styles.subHeader}>6. Your Privacy Rights</Text>
        <Text style={styles.text}>
          You have the right to: - Access the information we hold about you. -
          Request that we delete your information. - Withdraw your consent for
          the processing of your data, where applicable. To exercise these
          rights, please contact us at [Your Contact Email].
        </Text>

        <Text style={styles.subHeader}>7. Children's Privacy</Text>
        <Text style={styles.text}>
          ObsidianFocus is not intended for children under the age of 13. We do
          not knowingly collect personally identifiable information from
          children under 13. If we discover that a child under 13 has provided
          us with personal information, we will delete it immediately.
        </Text>

        <Text style={styles.subHeader}>8. Changes to This Privacy Policy</Text>
        <Text style={styles.text}>
          We may update this privacy policy from time to time to reflect changes
          to our practices or for other operational, legal, or regulatory
          reasons. We encourage you to review this policy periodically to stay
          informed of any changes.
        </Text>

        <Text style={styles.subHeader}>9. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about this privacy policy or how we handle
          your personal information, please contact us at [Your Contact Email].
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
