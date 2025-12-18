import { createListenerMiddleware } from "@reduxjs/toolkit";

import { userApi } from "../user/userApi";

export const userMiddleware = createListenerMiddleware();

userMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.jwtToken) {
      localStorage.setItem("token", action.payload.jwtToken);
    }
  },
});
