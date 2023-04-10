import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/MovieApi";
import darkModeReducer from "./features/DarkThemeSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    darkMode: darkModeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
