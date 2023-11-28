import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import notificationReducer from "@/components/Notification/NotificationSlice";
import { moviesApi } from "@/features/movies";
import selectedMoviesSliceReducer from "@/features/movies/components/SelectedMovieSlice";

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
