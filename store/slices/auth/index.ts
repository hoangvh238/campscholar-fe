import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import { authAPI } from "@/store/queries/auth";
import webStorageClient from "@/utils/webStorageClient";

interface AuthSlickInterface {
  userInfo: any;
  access_token: any;
}

const initialState: AuthSlickInterface = {
  userInfo: null,
  access_token: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    actionLogin: (
      state,
      action: PayloadAction<{
        username: string;
        password: string;
        isRemember: boolean;
      }>,
    ) => {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authAPI.endpoints.signIn.matchFulfilled,
      (state, action) => {
        webStorageClient.setToken(action?.payload?.tokens?.access);
        // webStorageClient.set(constants.USER_INFO, action?.payload);
        // webStorageClient.set(constants.IS_AUTH, true);
        // state.isAuth = true;
        state.userInfo = action?.payload;
        state.access_token = action?.payload?.tokens?.access;
      },
    );
  },
});

export const { actionLogin } = authSlice.actions;

export default authSlice.reducer;
