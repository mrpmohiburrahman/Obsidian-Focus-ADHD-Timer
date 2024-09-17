// app/settings/_layout.js

import { Stack } from "expo-router";
import React from "react";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Settings" }} />
      <Stack.Screen
        name="terms-and-conditions"
        options={{
          title: "Terms and Conditions",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="privacy-policy"
        options={{ title: "Privacy Policy", presentation: "modal" }}
      />
    </Stack>
  );
}
