import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { moviesApi } from "@/features/movies";
import notificationReducer from "@/stores/NotificationSlice";
import selectedMoviesSliceReducer from "@/stores/SelectedMovieSlice";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    selectedMovie: selectedMoviesSliceReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
