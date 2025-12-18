import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { serviceApi } from "./serviceApi";
import { userSlice } from "./user/userSlice";
import { userMiddleware } from "./middleware/userMiddleware";

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      serviceApi.middleware,
      userMiddleware.middleware,
    ]),
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
