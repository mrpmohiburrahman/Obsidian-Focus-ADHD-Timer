import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationsEnabled: false,
  stopAfterFirstSession: false, // Renamed from continueAsStopwatch to stopAfterFirstSession
  usePlainBackground: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleNotification(state) {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    toggleStopAfterFirstSession(state) {
      // Updated action
      state.stopAfterFirstSession = !state.stopAfterFirstSession;
    },
    togglePlainBackground(state) {
      state.usePlainBackground = !state.usePlainBackground;
    },
  },
});

export const {
  toggleNotification,
  toggleStopAfterFirstSession, // Export the updated action
  togglePlainBackground,
} = settingsSlice.actions;

export default settingsSlice.reducer;
