import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import winnerReducer from "./slice/winnerSlice";
import serialReducer from "./slice/serialSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    winners: winnerReducer,
    serials: serialReducer,
  },
});

export default store;
