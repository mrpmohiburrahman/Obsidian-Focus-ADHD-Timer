// redux/store.ts

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import timerReducer from "./slices/timerSlice";
import xpReducer from "./slices/xpSlice";
import settingsReducer from "./slices/settingsSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import mmkvStorage from "./mmkvStorage";

// Combine all your reducers here
const rootReducer = combineReducers({
  timer: timerReducer,
  xp: xpReducer,
  settings: settingsReducer,
  // Add other reducers here if needed
});

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  storage: mmkvStorage, // Use the custom MMKV storage adapter
  whitelist: ["timer", "xp","settings"], // Specify which slices to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable state
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
