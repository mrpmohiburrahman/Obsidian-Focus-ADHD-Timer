// store/xpSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface XpState {
  xp: number;
  totalFocusedTime: number; // in seconds
  sessionCount: number;
  consecutiveSessions: number;
  rank: string;
  lastSessionDate: string | null; // ISO date string
  consecutiveDays: number;
}

const initialState: XpState = {
  xp: 0,
  totalFocusedTime: 0,
  sessionCount: 0,
  consecutiveSessions: 0,
  rank: "Peasant",
  lastSessionDate: null,
  consecutiveDays: 0,
};

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

const xpSlice = createSlice({
  name: "xp",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<{ sessionLength: number }>) => {
      const { sessionLength } = action.payload; // sessionLength in seconds
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
      const today = new Date().toISOString().split("T")[0];
      let dailyBonus = 0;
      let consecutiveDayBonus = 0;

      if (state.lastSessionDate !== today) {
        // First session today
        dailyBonus = 5;

        // Check for consecutive days
        if (
          state.lastSessionDate &&
          new Date(today).getTime() -
            new Date(state.lastSessionDate).getTime() ===
            86400000 // 1 day in milliseconds
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

      // Update Rank
      let newRank = state.rank;
      for (const threshold in xpThresholds) {
        if (state.xp >= parseInt(threshold)) {
          newRank = xpThresholds[threshold];
        } else {
          break;
        }
      }
      state.rank = newRank;
    },
    resetConsecutiveSessions: (state) => {
      state.consecutiveSessions = 0;
    },
    resetConsecutiveDays: (state) => {
      state.consecutiveDays = 0;
    },
  },
});

export const { addSession, resetConsecutiveSessions, resetConsecutiveDays } =
  xpSlice.actions;

export default xpSlice.reducer;
