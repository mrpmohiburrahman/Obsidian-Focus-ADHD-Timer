import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationsEnabled: false,
  continueAsStopwatch: false,
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
  },
});

export const { toggleNotification, toggleStopwatch } = settingsSlice.actions;

export default settingsSlice.reducer;
