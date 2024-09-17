import { createSlice } from '@reduxjs/toolkit';

interface OnboardingState {
  isOnboardingComplete: boolean;
}

const initialState: OnboardingState = {
  isOnboardingComplete: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnboardingComplete: (state) => {
      state.isOnboardingComplete = true;
    },
  },
});

export const { setOnboardingComplete } = onboardingSlice.actions;
export default onboardingSlice.reducer;
