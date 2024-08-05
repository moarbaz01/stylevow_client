import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/ApiService";

export const checkServer = createAsyncThunk("checkServer", async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/check",
  });

  return res.data;
});

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    loading: true,
  },
  extraReducers: (builder) => {
    builder.addCase(checkServer.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export default loadingSlice.reducer;
