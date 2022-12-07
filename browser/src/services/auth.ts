import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "config/axios";
import { ACCESS_TOKEN } from "constants/index";
import { AUTH_METHOD } from "enums/index";
import { parseJwt } from "utils/index";
export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string
  email: string;
  password: string;
  mobile?:string;
  info?:string;
  avatar?:string;
}

interface SocialLogin {
  accessToken: string;
  method: AUTH_METHOD;
}

export const login = createAsyncThunk(
  "login",
  async (loginPayload: LoginPayload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post("/user/login", loginPayload);
      const { accessToken } = response.data;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      return {
        user: parseJwt(accessToken),
      };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const signup = createAsyncThunk(
  "signUp",
  async (loginPayload: LoginPayload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post("/user/signUp", loginPayload);
      console.log(response);
      
      return response
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const loginSocial = createAsyncThunk(
  "login-social",
  async (payload: SocialLogin, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post("/loginSocial", payload);
      return fulfillWithValue(response.data);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
