import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serialService from "../service/serialService";

// thunk
export const fetchSerials = createAsyncThunk(
  "serials/fetchSerials",
  async (data, thunkAPI) => {
    try {
      return await serialService.getSerials(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Error fetching serials" }
      );
    }
  }
);

export const checkSerial = createAsyncThunk(
  "serials/checkSerial",
  async (data, thunkAPI) => {
    try {
      return await serialService.checkSerial(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Error checking serial" }
      );
    }
  }
);

export const claimSerial = createAsyncThunk(
  "serials/claimSerial",
  async (data, thunkAPI) => {
    try {
      return await serialService.claimSerial(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Error checking serial" }
      );
    }
  }
);

const serialSlice = createSlice({
  name: "serials",
  initialState: {
    serials: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
    totalSerials: 0,
    price: 0,
    message: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSerials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSerials.fulfilled, (state, action) => {
        state.loading = false;
        state.serials = action.payload.serials || [];
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.currentPage || 1;
        state.totalSerials = action.payload.total || 0;
      })
      .addCase(fetchSerials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load serials";
      })
      .addCase(checkSerial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkSerial.fulfilled, (state, action) => {
        state.loading = false;
        state.price = action.payload.price || 0;
        state.error = null;
      })
      .addCase(checkSerial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to check reward";
      })
      .addCase(claimSerial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(claimSerial.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message
        state.error = null;
      })
      .addCase(claimSerial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to claim reward";
      });
  },
});

export default serialSlice.reducer;
