// constants/Colors.ts

/**
 * Centralized color definitions for the app.
 */

export const Colors = {
  primary: "#B98FFE", // Original primary color
  background: "#212327", // App background color
  firstUnfilledColor: "#2D2F33", // Slightly lighter than the background
  // Alternatively, as an array if you prefer to iterate over colors
  colorArray: ["#BB86FC", "#FF9800", "#03DAC6", "#FFC107", "#8BC34A"],
  // Adjusted colors for the drawer
  drawerActiveBackgroundColor: "#6F41A5", // Darker version of primary color
  drawerInactiveBackgroundColor: "#212327", // Matches app background
  drawerActiveTintColor: "#FFFFFF", // White text for active item
  drawerInactiveTintColor: "#BBBBBB", // Gray text for inactive items
  light: {
    text: "#11181C",
    background: "#FFFFFF",
    tint: "#0a7ea4",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#0a7ea4",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: "#FFFFFF",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#FFFFFF",
  },
};
