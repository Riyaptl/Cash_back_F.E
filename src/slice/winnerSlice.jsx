import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import winnerService from "../service/winnerService";

// thunk
export const fetchWinners = createAsyncThunk(
  "winners/fetchWinners",
  async (data, thunkAPI) => {
    try {
      return await winnerService.getWinners(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Error fetching winners" }
      );
    }
  }
);

export const clearSerial = createAsyncThunk(
  "winners/clearSerial",
  async (data, thunkAPI) => {
    try {
      return await winnerService.clearSerial(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Error clearing serial" }
      );
    }
  }
);

const winnersSlice = createSlice({
  name: "winners",
  initialState: {
    winners: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
    totalWinners: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.loading = false;
        state.winners = action.payload.winners || [];
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.currentPage || 1;
        state.totalWinners = action.payload.total || 0;
      })
      .addCase(fetchWinners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load winners";
      })
      .addCase(clearSerial.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(clearSerial.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;   
      })
      .addCase(clearSerial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to clear serial";
      });
  },
});

export default winnersSlice.reducer;
