import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationsEnabled: false,
  continueAsStopwatch: false,
  usePlainBackground: false, // Added new state for plain background toggle
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleNotification(state) {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    toggleStopwatch(state) {
      state.continueAsStopwatch = !state.continueAsStopwatch;
    },
    togglePlainBackground(state) {
      state.usePlainBackground = !state.usePlainBackground;
    },
  },
});

export const {
  toggleNotification,
  toggleStopwatch,
  togglePlainBackground, // Export new action
} = settingsSlice.actions;

export default settingsSlice.reducer;
