
// hooks/useTimer.ts

import { useState, useEffect, useRef } from "react";

type UseTimerReturnType = {
  fixedTime: number;
  setFixedTime: (time: number) => void;
  elapsedTime: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  lapCount: number;
  laps: number[];
  isAnimated: boolean;
};

export const useTimer = (): UseTimerReturnType => {
  const [fixedTime, setFixedTimeState] = useState<number>(5); // Default 5 seconds
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lapCount, setLapCount] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [isAnimated, setIsAnimated] = useState<boolean>(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const previousElapsedRef = useRef<number>(0);

  const setFixedTime = (time: number): void => {
    setFixedTimeState(time);
    setElapsedTime(0);
    previousElapsedRef.current = 0;
    setLapCount(0);
    setLaps([]);
    setIsAnimated(true);
  };

  const start = (): void => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now();
    }
  };

  const pause = (): void => {
    if (isRunning) {
      setIsRunning(false);
      if (startTimeRef.current) {
        const delta = (Date.now() - startTimeRef.current) / 1000;
        previousElapsedRef.current += delta;
      }
    }
  };

  const reset = (): void => {
    setIsRunning(false);
    setElapsedTime(0);
    previousElapsedRef.current = 0;
    setLapCount(0);
    setLaps([]);
    setIsAnimated(true);
  };

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

  return {
    fixedTime,
    setFixedTime,
    elapsedTime,
    isRunning,
    start,
    pause,
    reset,
    lapCount,
    laps,
    isAnimated,
  };
};