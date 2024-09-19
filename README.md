
## Obsidian Focus
A distraction-free Pomodoro app designed for ADHD users, featuring a unique medieval ranking system. Here's a quick demo.


https://github.com/user-attachments/assets/f99f9f23-b93d-4c57-979a-780466e52d56











<details>
<summary> Calculation Of XPs</summary>

---

## **Updated Experience Points (XP) System**

### **1. Base XP Earning**

- **XP per Minute**: Users earn **1 XP per minute** of focused time during a session.
  - For example:
    - A 5-minute session earns **5 XP**.
    - A 25-minute session earns **25 XP**.

### **2. Session Completion Bonus**

- **Session Bonus**: For each completed focus session, users earn an additional **5 XP**.
  - This encourages users to complete sessions rather than stopping mid-way.

### **3. Consecutive Session (Lap) Bonuses**

- Since your app tracks laps (sessions) and changes the color of the progress bar based on the session number, we can introduce bonuses for consecutive sessions without pausing.

- **Streak Bonuses**:
  - **First session**: No bonus
  - **Second consecutive session**: +2 XP
  - **Third consecutive session**: +4 XP
  - **Fourth and subsequent consecutive sessions**: +6 XP per session

- **Example**:
  - User completes three 5-minute sessions back-to-back:
    - Base XP: 5 XP × 3 sessions = 15 XP
    - Session Completion Bonus: 5 XP × 3 sessions = 15 XP
    - Streak Bonuses:
      - First session: 0 XP
      - Second session: +2 XP
      - Third session: +4 XP
    - **Total XP**: 15 (Base) + 15 (Completion) + 6 (Streak) = **36 XP**

### **4. Total Focused Time Bonuses**

- **Milestone Bonuses**: Users receive extra XP when they reach certain total focused times.
  - **1 Hour Total Focused Time**: +20 XP
  - **5 Hours Total Focused Time**: +50 XP
  - **10 Hours Total Focused Time**: +100 XP
  - **25 Hours Total Focused Time**: +250 XP
  - **50 Hours Total Focused Time**: +500 XP
  - **100 Hours Total Focused Time**: +1,000 XP

### **5. Lap Count Achievements**

- **Session Milestones**: Users earn XP when they complete a certain number of sessions (laps).
  - **10 Sessions Completed**: +20 XP
  - **50 Sessions Completed**: +50 XP
  - **100 Sessions Completed**: +100 XP
  - **250 Sessions Completed**: +250 XP
  - **500 Sessions Completed**: +500 XP
  - **1,000 Sessions Completed**: +1,000 XP

### **6. Daily Use Bonuses**

- **Daily Usage**: If a user completes at least one focus session in a day, they earn a daily bonus of **5 XP**.
- **Consecutive Day Streaks**:
  - **2 Consecutive Days**: +5 XP
  - **3 Consecutive Days**: +10 XP
  - **4 Consecutive Days**: +15 XP
  - **5 or More Consecutive Days**: +20 XP per day

### **7. Example Scenario**

- **Day 1**:
  - User completes four 10-minute sessions consecutively.
  - **Base XP**: 10 min × 4 sessions = 40 XP
  - **Session Completion Bonus**: 5 XP × 4 = 20 XP
  - **Streak Bonuses**:
    - First session: 0 XP
    - Second session: +2 XP
    - Third session: +4 XP
    - Fourth session: +6 XP
    - Total Streak Bonus: 12 XP
  - **Daily Use Bonus**: 5 XP
  - **Total XP for Day 1**: 40 + 20 + 12 + 5 = **77 XP**

- **Day 2**:
  - User completes two 15-minute sessions.
  - **Base XP**: 15 min × 2 = 30 XP
  - **Session Completion Bonus**: 5 XP × 2 = 10 XP
  - **Streak Bonus**:
    - First session: 0 XP
    - Second session: +2 XP
    - Total Streak Bonus: 2 XP
  - **Daily Use Bonus**: 5 XP
  - **Consecutive Day Streak Bonus**: Since this is the second day, +5 XP
  - **Total XP for Day 2**: 30 + 10 + 2 + 5 + 5 = **52 XP**

---

## **Revised Medieval Ranks and XP Thresholds**

Given the adjusted XP system, we might need to revise the XP thresholds for ranks to match typical user progression.

1. **Peasant**: Starting Rank (0 XP)
2. **Serf**: 200 XP
3. **Freeman**: 500 XP
4. **Yeoman**: 1,000 XP
5. **Squire**: 1,500 XP
6. **Knight**: 2,000 XP
7. **Baron**: 3,000 XP
8. **Viscount**: 4,000 XP
9. **Earl**: 5,000 XP
10. **Marquis**: 7,500 XP
11. **Duke**: 10,000 XP
12. **Prince**: 15,000 XP
13. **King**: 20,000 XP
14. **Emperor**: 30,000 XP

---


## **Additional Gamification Features**

### **Achievements Based on Session Length**

- **Long Focus Sessions**: Reward users for completing longer focus sessions.
  - **Complete a 30-minute session**: +20 XP
  - **Complete a 60-minute session**: +50 XP
  - **Complete a 90-minute session**: +100 XP

### **Customization Unlocks**


---

</details>
