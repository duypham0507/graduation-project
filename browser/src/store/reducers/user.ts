import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AUTH_METHOD, PERMISSION, LOADING_STATUS } from "enums/index";
import { AppState } from "../";
import { login } from "services/auth";
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  mobile: Maybe<string>;
  info: Maybe<string>;
  avatar: Maybe<string>;
  permission: PERMISSION;
  method: AUTH_METHOD;
}

interface IUserSlice {
  user: Maybe<UserInfo>;
  loginLoading: LOADING_STATUS;
}

const initialState: IUserSlice = {
  user: null,
  loginLoading: LOADING_STATUS.IDLE,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = LOADING_STATUS.LOADING;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.user = user;

        state.loginLoading = LOADING_STATUS.FULFILLED;
      })
      .addCase(login.rejected, (state) => {
        state.loginLoading = LOADING_STATUS.ERROR;
      });
  },
});
export const userReducer = userSlice.reducer;
export const selectUser = (state: AppState) => state.user;
