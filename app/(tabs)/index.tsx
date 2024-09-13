// Index.tsx

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import * as Progress from "react-native-progress";

type IndexProps = {};

const Index: React.FC<IndexProps> = () => {
  // State variables
  const [fixedTime, setFixedTime] = useState<number>(5); // Default 5 seconds for demonstration
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("5"); // To manage TextInput value
  const [lapCount, setLapCount] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]); // Lap history
  const [isAnimated, setIsAnimated] = useState<boolean>(true); // Controls the animated prop

  // Predefined color palette
  const colors: string[] = [
    "#BB86FC", // Purple
    "#03DAC6", // Teal
    "#CF6679", // Pink
    "#FF9800", // Orange
    "#8BC34A", // Light Green
  ];

  // Calculate current and previous colors
  const currentColor: string = colors[lapCount % colors.length];
  const previousColor: string =
    lapCount === 0 ? "#1E1E1E" : colors[(lapCount - 1) % colors.length];

  // Refs to store interval ID and timing information
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const previousElapsedRef = useRef<number>(0);

  // Function to format time in MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const minutes: number = Math.floor(timeInSeconds / 60);
    const seconds: number = timeInSeconds % 60;
    const formattedMinutes: string =
      minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds: string =
      seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Start the timer
  const handleStart = (): void => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now();
    }
  };

  // Pause the timer
  const handlePause = (): void => {
    if (isRunning) {
      setIsRunning(false);
      if (startTimeRef.current) {
        const delta = (Date.now() - startTimeRef.current) / 1000;
        previousElapsedRef.current += delta;
      }
    }
  };

  // Reset the timer
  const handleReset = (): void => {
    setIsRunning(false);
    setElapsedTime(0);
    previousElapsedRef.current = 0;
    setLapCount(0);
    setLaps([]);
    setIsAnimated(true); // Ensure animation is enabled after reset
  };

  // Set fixed time from user input
  const handleSetFixedTime = (input: string): void => {
    const timeParts = input.split(":").map((part) => parseInt(part, 10));
    let totalSeconds = 0;

    if (timeParts.length === 2) {
      const [minutes, seconds] = timeParts;
      if (
        !isNaN(minutes) &&
        !isNaN(seconds) &&
        seconds < 60 &&
        minutes >= 0 &&
        seconds >= 0
      ) {
        totalSeconds = minutes * 60 + seconds;
      }
    } else if (timeParts.length === 1) {
      const [seconds] = timeParts;
      if (!isNaN(seconds) && seconds > 0) {
        totalSeconds = seconds;
      }
    }

    if (totalSeconds > 0) {
      setFixedTime(totalSeconds);
      setElapsedTime(0);
      previousElapsedRef.current = 0;
      setLapCount(0);
      setLaps([]);
      setIsAnimated(true); // Ensure animation is enabled after setting new time
    } else {
      // Handle invalid input, e.g., show an alert or error message
      Alert.alert(
        "Invalid Input",
        "Please enter a valid time in MM:SS or SS format."
      );
    }
  };

  // Effect to handle the timer updates
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const delta = (Date.now() - startTimeRef.current) / 1000;
          const totalElapsed = previousElapsedRef.current + delta;

          setElapsedTime(totalElapsed);

          // Calculate the number of completed laps
          const newLapCount = Math.floor(totalElapsed / fixedTime);

          // Update lap count only if a new lap has been completed
          if (newLapCount > lapCount) {
            setLapCount(newLapCount);
            setLaps((prevLaps) => [...prevLaps, Math.floor(totalElapsed)]);

            // Control animation: disable, reset progress, then enable
            setIsAnimated(false); // Disable animation to reset progress instantly
            setElapsedTime(newLapCount * fixedTime); // Reset elapsedTime to exact lap multiple

            // Re-enable animation after a brief delay
            setTimeout(() => {
              setIsAnimated(true);
              // Restart the timer reference to continue from the exact lap time
              previousElapsedRef.current = newLapCount * fixedTime;
              startTimeRef.current = Date.now();
            }, 50); // 50ms delay ensures the reset happens before animation resumes
          }
        }
      }, 100); // Update every 100ms for smoothness
    }

    // Cleanup on pause or unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, fixedTime, lapCount]);

  // Calculate progress for the current interval
  const progress = (elapsedTime % fixedTime) / fixedTime;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Timer App</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Set Fixed Time (MM:SS or SS):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={inputValue}
          onChangeText={(text) => {
            setInputValue(text);
            handleSetFixedTime(text);
          }}
          placeholder="MM:SS or SS"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.progressContainer}>
        <Progress.Circle
          size={200}
          progress={progress}
          showsText={false}
          thickness={10}
          color={currentColor} // Dynamic color based on lapCount
          unfilledColor={previousColor} // Set to previous fill color
          borderWidth={0}
          animated={isAnimated}
          strokeCap="round"
        >
          <Text style={styles.timerText}>
            {formatTime(Math.floor(elapsedTime))}
          </Text>
        </Progress.Circle>
      </View>

      <View style={styles.buttonContainer}>
        {!isRunning ? (
          <TouchableOpacity
            style={styles.button}
            onPress={handleStart}
            accessibilityLabel="Start Timer"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handlePause}
            accessibilityLabel="Pause Timer"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleReset}
          accessibilityLabel="Reset Timer"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.infoText}>Fixed Time: {formatTime(fixedTime)}</Text>

      <Text style={styles.infoText}>Completed Intervals: {lapCount}</Text>

      {/* Lap History */}
      {/* {laps.length > 0 && (
        <View style={styles.lapContainer}>
          <Text style={styles.lapTitle}>Lap History:</Text>
          {laps.map((lapTime, index) => (
            <Text key={index} style={styles.lapText}>
              Lap {index + 1}: {formatTime(lapTime)}
            </Text>
          ))}
        </View>
      )} */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212", // Dark background
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 40,
    color: "#FFFFFF", // White text
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderColor: "#333333",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: "#FFFFFF",
    backgroundColor: "#1E1E1E",
  },
  progressContainer: {
    alignItems: "center",
    marginVertical: 40,
  },
  timerText: {
    fontSize: 32,
    color: "#FFFFFF",
    fontFamily: "Courier", // Monospace font for timer
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#BB86FC", // Base color for buttons
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 2, // Add shadow for Android
    shadowColor: "#000", // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
    color: "#BBBBBB",
    marginTop: 10,
  },
  lapContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1E1E1E",
    borderRadius: 5,
  },
  lapTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  lapText: {
    color: "#BBBBBB",
    fontSize: 14,
    marginBottom: 2,
  },
});

export default Index;
