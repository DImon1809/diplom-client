import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "./userApi";

export interface IinitialState {
  jwtToken: string;
  isAuthorized: boolean;
  parameters:
    | {
        id: number;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        xrMiddle: any;
      }[]
    | null;
}

const initialState: IinitialState = {
  isAuthorized: false,
  jwtToken: "",
  parameters: null,
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

    builder.addMatcher(
      userApi.endpoints.current.matchFulfilled,
      (
        state,
        action: PayloadAction<{
          id: number;
          email: string;
          parameters: {
            id: number;
            name: string;
            unit: string;
            upperLimit: string;
            lowerLimit: string;
            details: string[];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            xrMiddle: any;
            createdAt: string;
          }[];
        }>
      ) => {
        state.parameters = action.payload.parameters;
      }
    );
  },
});

export const { loguot, setAuthStatus } = userSlice.actions;
