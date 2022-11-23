import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { Store } from "antd/es/form/interface";
import { userReducer } from "./reducers/user";

const store = configureStore({
  reducer: {
    user:userReducer,
  },
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;


export default store;
