import { Audio } from "expo-av";

let soundRef: Audio.Sound | null = null;

/**
 * Plays a sound for a specified duration in seconds.
 * @param filePath - The path to the sound file (e.g., require("@/assets/sounds/waves.mp3"))
 * @param durationInSeconds - Duration in seconds for which the sound should play.
 */
const filePath = require("@/assets/sounds/waves.mp3");
export const playSoundForDuration = async (
  durationInSeconds: number
): Promise<void> => {
  try {
    // Create and load the sound
    const { sound } = await Audio.Sound.createAsync(filePath);
    soundRef = sound;

    // Play the sound
    await sound.playAsync();

    // Set a timer to stop the sound after the specified duration
    setTimeout(async () => {
      if (soundRef) {
        await soundRef.stopAsync();
        await soundRef.unloadAsync();
        soundRef = null; // Clear the reference after sound is unloaded
      }
    }, durationInSeconds * 1000); // Convert seconds to milliseconds
  } catch (error) {
    console.error("Error while playing sound:", error);
  }
};

/**
 * Stops the currently playing sound, if any.
 */
export const stopSound = async (): Promise<void> => {
  if (soundRef) {
    try {
      await soundRef.stopAsync();
      await soundRef.unloadAsync();
      soundRef = null;
    } catch (error) {
      console.error("Error while stopping sound:", error);
    }
  }
};
