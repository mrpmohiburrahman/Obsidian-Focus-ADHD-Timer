
// utils/formatTime.ts

export const formatTime = (timeInSeconds: number): string => {
  const minutes: number = Math.floor(timeInSeconds / 60);
  const seconds: number = Math.floor(timeInSeconds % 60);
  const formattedMinutes: string =
    minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds: string =
    seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
};