import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setOnboardingComplete } from "../redux/slices/onboardingSlice";

const OnboardContext = createContext({
  isOnboarded: false,
  completeOnboarding: () => {},
});

export function useOnboard() {
  return useContext(OnboardContext);
}

export function OnboardProvider({ children }: React.PropsWithChildren) {
  const dispatch = useDispatch<AppDispatch>();
  const isOnboardingComplete = useSelector(
    (state: RootState) => state.onboarding.isOnboardingComplete
  );
  const router = useRouter();

  useEffect(() => {
    if (!isOnboardingComplete) {
      console.log(
        "🚀 ~ React.useEffect ~ isOnboarded: if block",
        isOnboardingComplete
      );

      router.replace("/(onboarding)");
    } else {
      console.log(
        "🚀 ~ React.useEffect ~ isOnboarded: elseblock",
        isOnboardingComplete
      );
      router.replace("/(app)/(drawer)");
    }
  }, [isOnboardingComplete, router]);

  const completeOnboarding = () => {
    dispatch(setOnboardingComplete());
  };

  return (
    <OnboardContext.Provider
      value={{ isOnboarded: isOnboardingComplete, completeOnboarding }}
    >
      {children}
    </OnboardContext.Provider>
  );
}
