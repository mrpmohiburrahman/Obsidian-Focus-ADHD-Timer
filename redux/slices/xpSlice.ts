// store/xpSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

interface Session {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  duration: number; // in seconds
}

interface XpState {
  xp: number;
  totalFocusedTime: number; // in seconds
  sessionCount: number;
  consecutiveSessions: number;
  rank: string;
  lastSessionDate: string | null; // ISO date string
  consecutiveDays: number;
  sessions: Session[]; // Added to track individual sessions
}

const initialState: XpState = {
  xp: 0,
  totalFocusedTime: 0,
  sessionCount: 0,
  consecutiveSessions: 0,
  rank: "Peasant",
  lastSessionDate: null,
  consecutiveDays: 0,
  sessions: [], // Initialize as empty array
};
// Define the available rank types
export type Rank =
  | "Peasant"
  | "Serf"
  | "Freeman"
  | "Yeoman"
  | "Squire"
  | "Knight"
  | "Baron"
  | "Viscount"
  | "Earl"
  | "Marquis"
  | "Duke"
  | "Prince"
  | "King"
  | "Emperor";

const xpThresholds: { [key: number]: string } = {
  0: "Peasant",
  200: "Serf",
  500: "Freeman",
  1000: "Yeoman",
  1500: "Squire",
  2000: "Knight",
  3000: "Baron",
  4000: "Viscount",
  5000: "Earl",
  7500: "Marquis",
  10000: "Duke",
  15000: "Prince",
  20000: "King",
  30000: "Emperor",
};

// Helper function to determine rank based on XP
const determineRank = (xp: number): string => {
  let newRank = "Peasant";
  for (const threshold in xpThresholds) {
    if (xp >= parseInt(threshold)) {
      newRank = xpThresholds[threshold];
    } else {
      break;
    }
  }
  return newRank;
};

// Helper function to get today's date in YYYY-MM-DD format
const getToday = (): string => moment().format("YYYY-MM-DD");

const xpSlice = createSlice({
  name: "xp",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<{ sessionLength: number }>) => {
      const { sessionLength } = action.payload; // sessionLength in seconds
      // console.log("🚀 ~ sessionLength:", sessionLength, typeof sessionLength);
      const sessionMinutes = parseFloat((sessionLength / 60).toFixed(2));
      // console.log("🚀 ~ sessionMinutes:", sessionMinutes);

      // Update total focused time and session count
      state.totalFocusedTime += sessionLength;
      state.sessionCount += 1;
      // console.log("🚀 ~ totalFocusedTime:", state.totalFocusedTime);

      // If session is less than or equal to 5 minutes, just return after updating the time
      if (sessionMinutes <= 5) {
        const newSession: Session = {
          id: Date.now().toString(),
          date: getToday(),
          duration: sessionLength,
        };
        state.sessions.push(newSession);
        return;
      }

      // Base XP per minute for sessions longer than 5 minutes
      const baseXp = Math.floor(sessionMinutes * 1); // 1 XP per minute

      // Session Completion Bonus
      const completionBonus = 5;

      // Streak Bonus
      let streakBonus = 0;
      state.consecutiveSessions += 1;
      if (state.consecutiveSessions === 2) {
        streakBonus = 2;
      } else if (state.consecutiveSessions === 3) {
        streakBonus = 4;
      } else if (state.consecutiveSessions >= 4) {
        streakBonus = 6;
      }

      // Milestone Bonuses for total focused time
      let milestoneBonus = 0;
      const totalFocusedHours = state.totalFocusedTime / 3600; // Convert seconds to hours
      const milestones = [1, 5, 10, 25, 50, 100];
      const milestoneXPs = [20, 50, 100, 250, 500, 1000];
      milestones.forEach((milestone, index) => {
        if (
          totalFocusedHours - sessionLength / 3600 < milestone &&
          totalFocusedHours >= milestone
        ) {
          milestoneBonus += milestoneXPs[index];
        }
      });

      // Session Milestones
      let sessionMilestoneBonus = 0;
      const sessionMilestones = [10, 50, 100, 250, 500, 1000];
      const sessionMilestoneXPs = [20, 50, 100, 250, 500, 1000];
      sessionMilestones.forEach((milestone, index) => {
        if (
          state.sessionCount < milestone &&
          state.sessionCount + 1 >= milestone
        ) {
          sessionMilestoneBonus += sessionMilestoneXPs[index];
        }
      });

      // Daily Use Bonus
      const today = getToday();
      let dailyBonus = 0;
      let consecutiveDayBonus = 0;

      if (state.lastSessionDate !== today) {
        // First session today
        dailyBonus = 5;

        // Check for consecutive days
        if (
          state.lastSessionDate &&
          moment(today).diff(moment(state.lastSessionDate), "days") === 1
        ) {
          state.consecutiveDays += 1;
        } else {
          state.consecutiveDays = 1;
        }

        // Consecutive Day Streak Bonus
        if (state.consecutiveDays === 2) {
          consecutiveDayBonus = 5;
        } else if (state.consecutiveDays === 3) {
          consecutiveDayBonus = 10;
        } else if (state.consecutiveDays === 4) {
          consecutiveDayBonus = 15;
        } else if (state.consecutiveDays >= 5) {
          consecutiveDayBonus = 20;
        }
      }

      state.lastSessionDate = today;

      // Total XP calculation for sessions longer than 5 minutes
      const totalXpGained =
        baseXp +
        completionBonus +
        streakBonus +
        milestoneBonus +
        sessionMilestoneBonus +
        dailyBonus +
        consecutiveDayBonus;

      state.xp += totalXpGained;

      // Add the session to the sessions array
      const newSession: Session = {
        id: Date.now().toString(),
        date: today,
        duration: sessionLength,
      };
      state.sessions.push(newSession);

      // Update Rank
      const newRank = determineRank(state.xp);
      state.rank = newRank;
    },
    // New reducer to add a session with a specific date
    addSessionWithDate: (
      state,
      action: PayloadAction<{ sessionLength: number; date: string }>
    ) => {
      const { sessionLength, date } = action.payload; // date in YYYY-MM-DD format
      const sessionMinutes = sessionLength / 60;

      // Base XP per minute
      const baseXp = Math.floor(sessionMinutes * 1); // 1 XP per minute

      // Session Completion Bonus
      const completionBonus = 5;

      // Streak Bonus
      let streakBonus = 0;
      state.consecutiveSessions += 1;
      if (state.consecutiveSessions === 2) {
        streakBonus = 2;
      } else if (state.consecutiveSessions === 3) {
        streakBonus = 4;
      } else if (state.consecutiveSessions >= 4) {
        streakBonus = 6;
      }

      // Update total focused time
      state.totalFocusedTime += sessionLength;

      // Milestone Bonuses for total focused time
      let milestoneBonus = 0;
      const totalFocusedHours = state.totalFocusedTime / 3600; // Convert seconds to hours
      const milestones = [1, 5, 10, 25, 50, 100];
      const milestoneXPs = [20, 50, 100, 250, 500, 1000];
      milestones.forEach((milestone, index) => {
        if (
          totalFocusedHours - sessionLength / 3600 < milestone &&
          totalFocusedHours >= milestone
        ) {
          milestoneBonus += milestoneXPs[index];
        }
      });

      // Session Milestones
      let sessionMilestoneBonus = 0;
      const sessionMilestones = [10, 50, 100, 250, 500, 1000];
      const sessionMilestoneXPs = [20, 50, 100, 250, 500, 1000];
      sessionMilestones.forEach((milestone, index) => {
        if (
          state.sessionCount < milestone &&
          state.sessionCount + 1 >= milestone
        ) {
          sessionMilestoneBonus += sessionMilestoneXPs[index];
        }
      });

      // Daily Use Bonus
      let dailyBonus = 0;
      let consecutiveDayBonus = 0;

      if (state.lastSessionDate !== date) {
        // First session on this date
        dailyBonus = 5;

        // Check for consecutive days
        if (
          state.lastSessionDate &&
          moment(date).diff(moment(state.lastSessionDate), "days") === 1
        ) {
          state.consecutiveDays += 1;
        } else {
          state.consecutiveDays = 1;
        }

        // Consecutive Day Streak Bonus
        if (state.consecutiveDays === 2) {
          consecutiveDayBonus = 5;
        } else if (state.consecutiveDays === 3) {
          consecutiveDayBonus = 10;
        } else if (state.consecutiveDays === 4) {
          consecutiveDayBonus = 15;
        } else if (state.consecutiveDays >= 5) {
          consecutiveDayBonus = 20;
        }
      }

      state.lastSessionDate = date;

      // Total XP calculation
      const totalXpGained =
        baseXp +
        completionBonus +
        streakBonus +
        milestoneBonus +
        sessionMilestoneBonus +
        dailyBonus +
        consecutiveDayBonus;

      state.xp += totalXpGained;
      state.sessionCount += 1;

      // Add the session to the sessions array
      const newSession: Session = {
        id: Date.now().toString(), // Simple unique ID based on timestamp
        date: date,
        duration: sessionLength,
      };
      state.sessions.push(newSession);

      // Update Rank
      const newRank = determineRank(state.xp);
      state.rank = newRank;
    },

    resetConsecutiveSessions: (state) => {
      state.consecutiveSessions = 0;
    },
    resetConsecutiveDays: (state) => {
      state.consecutiveDays = 0;
    },
    setRankManually: (state, action: PayloadAction<{ rank: Rank }>) => {
      const { rank } = action.payload;
      state.rank = rank;
    },
    // Add the resetState reducer
    resetXpState: () => initialState,
  },
});

// Export actions
export const {
  addSession,
  addSessionWithDate, // Export the new action
  resetConsecutiveSessions,
  resetConsecutiveDays,
  resetXpState,
  setRankManually, // Export the new action
} = xpSlice.actions;

// Export reducer
export default xpSlice.reducer;

// Selectors

// Selector to get all sessions
export const selectAllSessions = (state: { xp: XpState }) => state.xp.sessions;

// Selector to get sessions for a specific date
export const selectSessionsByDate =
  (date: string) => (state: { xp: XpState }) =>
    state.xp.sessions.filter((session) => session.date === date);

// Selector to get sessions for the last 7 days
export const selectLast7DaysSessions = (state: { xp: XpState }) => {
  const last7Days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    last7Days.push(moment().subtract(i, "days").format("YYYY-MM-DD"));
  }

  return last7Days.map((date) => ({
    date,
    sessions: state.xp.sessions.filter((session) => session.date === date),
  }));
};
