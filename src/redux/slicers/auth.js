import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/ApiService";

export const fetchUser = createAsyncThunk("getUser", async () => {
  const res = await apiRequest.get("/user");
  return res.data.user;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isUser: false,
    token: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isUser = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("stylevow_token", action.payload.token);
    },
    logoutSuccess: (state) => {
      state.isUser = false;
      state.token = null;
      state.user = {};
      localStorage.removeItem("stylevow_token");
    },
    loginFailure: (state) => {
      state.isUser = false;
      state.token = null;
      state.user = {};
      localStorage.removeItem("stylevow_token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isUser = true;
      state.token = action.payload.token;
    });
  },
});

export const { loginSuccess, logoutSuccess, loginFailure, updateUser } =
  authSlice.actions;

export default authSlice.reducer;
