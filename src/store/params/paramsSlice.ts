import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "./userApi";

export interface IinitialState {
  jwtToken: string;
  isAuthorized: boolean;
}

const initialState: IinitialState = {
  isAuthorized: false,
  jwtToken: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loguot: () => {
      localStorage.removeItem("token");
      return initialState;
    },

    setAuthStatus: (state, action: PayloadAction<string>) => {
      state.isAuthorized = true;
      state.jwtToken = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (
        state,
        action: PayloadAction<{
          jwtToken: string;
        }>
      ) => {
        state.isAuthorized = true;
        state.jwtToken = action.payload.jwtToken;
      }
    );
  },
});

export const { loguot, setAuthStatus } = userSlice.actions;
