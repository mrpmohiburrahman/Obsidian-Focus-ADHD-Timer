import { createSlice } from "@reduxjs/toolkit";

interface OnboardingState {
  isOnboardingComplete: boolean;
}

const initialState: OnboardingState = {
  isOnboardingComplete: false,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setOnboardingComplete: (state) => {
      state.isOnboardingComplete = true;
    },
    resetOnboardingState: () => initialState,
  },
});

export const { setOnboardingComplete, resetOnboardingState } =
  onboardingSlice.actions;
export default onboardingSlice.reducer;
