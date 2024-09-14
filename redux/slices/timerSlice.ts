// redux/slices/timerSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
  fixedTime: number; // in seconds
  elapsedTime: number; // in seconds
  isRunning: boolean;
  lapCount: number;
  laps: number[]; // array of lap times in seconds
}

const initialState: TimerState = {
  fixedTime: 5, // default 5 seconds
  elapsedTime: 0,
  isRunning: false,
  lapCount: 0,
  laps: [],
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setFixedTime(state, action: PayloadAction<number>) {
      state.fixedTime = action.payload;
      state.elapsedTime = 0;
      state.lapCount = 0;
      state.laps = [];
      state.isRunning = false;
    },
    startTimer(state) {
      state.isRunning = true;
    },
    pauseTimer(state) {
      state.isRunning = false;
    },
    resetTimer(state) {
      state.elapsedTime = 0;
      state.lapCount = 0;
      state.laps = [];
      state.isRunning = false;
    },
    incrementElapsedTime(state, action: PayloadAction<number>) {
      state.elapsedTime += action.payload;
    },
    addLap(state, action: PayloadAction<number>) {
      state.lapCount += 1;
      state.laps.push(action.payload);
    },
  },
});

export const {
  setFixedTime,
  startTimer,
  pauseTimer,
  resetTimer,
  incrementElapsedTime,
  addLap,
} = timerSlice.actions;

export default timerSlice.reducer;
