import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// Define the type for the props (if any). Since there are no props, we can omit it or define it as an empty object.
type IndexProps = {};

const Index: React.FC<IndexProps> = () => {
  const [fixedTime, setFixedTime] = useState<number>(300); // Default 5 minutes in seconds
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("300"); // To manage TextInput value

  // Ref to store the interval ID
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to handle the timer
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Cleanup the interval on pause or unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

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

  // Handlers for start, pause, and reset
  const handleStart = (): void => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handlePause = (): void => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const handleReset = (): void => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  // Handler to set fixed time from user input
  const handleSetFixedTime = (input: string): void => {
    const parsedTime: number = parseInt(input, 10);
    if (!isNaN(parsedTime) && parsedTime > 0) {
      setFixedTime(parsedTime);
      setElapsedTime(0); // Reset elapsed time when fixed time is set
    }
  };

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
          placeholder="300 for 5 minutes"
          placeholderTextColor="#888"
        />
      </View>

      <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>

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

      {elapsedTime >= fixedTime && (
        <Text style={styles.infoText}>Timer has exceeded the fixed time.</Text>
      )}
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
  timerText: {
    fontSize: 48,
    textAlign: "center",
    marginVertical: 40,
    color: "#FFFFFF",
    fontFamily: "Courier", // Monospace font for timer
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#BB86FC", // A vibrant color for buttons
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
