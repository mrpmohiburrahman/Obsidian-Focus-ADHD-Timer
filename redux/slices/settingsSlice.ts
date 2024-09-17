import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playSoundAfterFirstSession: false, // Updated state variable
  stopAfterFirstSession: false, // Renamed from continueAsStopwatch to stopAfterFirstSession
  usePlainBackground: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    togglePlaySoundAfterFirstSession(state) {
      // Updated action
      state.playSoundAfterFirstSession = !state.playSoundAfterFirstSession;
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
  toggleStopAfterFirstSession,
  togglePlaySoundAfterFirstSession, // Export the updated action
  togglePlainBackground,
} = settingsSlice.actions;

export default settingsSlice.reducer;
