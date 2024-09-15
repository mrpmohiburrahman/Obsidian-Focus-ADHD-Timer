// utils/populateSampleData.ts

import { addSessionWithDate } from "@/redux/slices/xpSlice";
import { store } from "@/redux/store";
import moment from "moment";

// Utility function to generate a random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to populate sessions for the last three weeks
export const populateLastThreeWeeks = () => {
  const weeksToPopulate = 3;

  for (let week = 0; week < weeksToPopulate; week++) {
    // Get the start and end of the week
    const startOfWeek = moment().subtract(week, "weeks").startOf("isoWeek"); // ISO week starts on Monday
    const endOfWeek = moment(startOfWeek).endOf("isoWeek");

    // Iterate through each day of the week
    for (let day = 0; day < 7; day++) {
      const currentDay = moment(startOfWeek).add(day, "days");
      const dateString = currentDay.format("YYYY-MM-DD");

      // Decide how many sessions to add for the day (0 to 3)
      const sessionsPerDay = getRandomInt(0, 3);

      for (let session = 0; session < sessionsPerDay; session++) {
        // Random session duration between 15 to 60 minutes
        const durationInMinutes = getRandomInt(15, 60);
        const durationInSeconds = durationInMinutes * 60;

        // Dispatch the action to add the session
        store.dispatch(
          addSessionWithDate({
            sessionLength: durationInSeconds,
            date: dateString,
          })
        );
      }
    }
  }

  console.log("Sample data for the last three weeks has been populated.");
};
