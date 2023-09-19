import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  vender: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.vender = action.payload.vender;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.vender = null;
      state.token = null;
    },
    setvender: (state, action) => {
      state.vender = action.payload.vender;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setvender,

} = authSlice.actions;
export default authSlice.reducer;

