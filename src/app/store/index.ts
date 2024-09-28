// src/app/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./authSlice"; // Slice untuk autentikasi

export const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer untuk autentikasi JWT
  },
});

export type RootStates = {
  auth: AuthState;
};

// Type untuk state dan dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
