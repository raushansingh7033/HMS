import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const profileSlice = createSlice({
  name: "user",
  initialState:{},
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      return state;
    },
    removeUser: (state) => {
      state = {};
      return state;
    },
  },
});

export const { setUser, removeUser } = profileSlice.actions;
export default profileSlice.reducer;
