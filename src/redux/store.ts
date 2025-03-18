/* eslint-disable max-len */
import _ from "lodash";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authReducer from "./reducers/auth.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (
    getDefaultMiddleware: (arg0: { serializableCheck: boolean }) => any
  ) => getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => IAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IRootState> = (arg: {
  (state: IRootState): any;
  (state: IRootState): any;
}) => useSelector(arg, _.isEqual);
