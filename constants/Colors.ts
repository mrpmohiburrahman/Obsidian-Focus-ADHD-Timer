// constants/Colors.ts

/**
 * Below are the colors that are used in the app. The colors are defined for both light and dark modes.
 * There are many other ways to style your app. For example, Nativewind (https://www.nativewind.dev/), Tamagui (https://tamagui.dev/), unistyles (https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  primary: "#B98FFE", // Primary color used throughout the app
  background: "#212327", // App background color
  firstUnfilledColor: "#2D2F33", // Slightly lighter than the background for the initial unfilled progress
  // Alternatively, as an array if you prefer to iterate over colors
  colorArray: ["#BB86FC", "#FF9800", "#03DAC6", "#FFC107", "#8BC34A"],
  light: {
    text: "#11181C",
    background: "#FFFFFF",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
