// src/app/store/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    removeToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
