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
    lapCount === 0
      ? "#1E1E1E" // Initial unfilled color
      : colors[(lapCount - 1) % colors.length];

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
  };

  // Set fixed time from user input
  const handleSetFixedTime = (input: string): void => {
    const parsedTime: number = parseInt(input, 10);
    if (!isNaN(parsedTime) && parsedTime > 0) {
      setFixedTime(parsedTime);
      setElapsedTime(0);
      previousElapsedRef.current = 0;
      setLapCount(0);
    } else {
      Alert.alert("Invalid Input", "Please enter a positive number.");
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
        <Text style={styles.label}>Set Fixed Time (seconds):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={inputValue}
          onChangeText={(text) => {
            setInputValue(text);
            handleSetFixedTime(text);
          }}
          placeholder="5 for 5 seconds"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.progressContainer}>
        <Progress.Circle
          size={200}
          progress={progress}
          // indeterminate
          // indeterminateAnimationDuration={8000}
          showsText={false}
          thickness={10}
          color={currentColor} // Dynamic color based on lapCount
          unfilledColor={previousColor} // Set to previous fill color
          borderWidth={0}
          animated={true}
        >
          <Text style={styles.timerText}>
            {formatTime(Math.floor(elapsedTime))}
          </Text>
        </Progress.Circle>
      </View>

      <View style={styles.buttonContainer}>
        {!isRunning ? (
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handlePause}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.infoText}>Fixed Time: {formatTime(fixedTime)}</Text>

      <Text style={styles.infoText}>Completed Intervals: {lapCount}</Text>
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
});

export default Index;
