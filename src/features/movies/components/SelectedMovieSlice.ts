import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SelectedMovie } from "@/features/movies";
import { RootState } from "@/stores";

const initialState: SelectedMovie = {
  value: {
    id: "",
    title: "",
  },
};

export const selectedMoviesSlice = createSlice({
  name: "selectedMovie",
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<SelectedMovie>) => {
      const { id, title } = action.payload.value;
      state.value = { id, title };
    },
    clearSelectedMovie: (state) => {
      state.value = { id: "", title: "" };
    },
  },
});

export const { setSelectedMovie, clearSelectedMovie } =
  selectedMoviesSlice.actions;

export const selectSelectedMovie = (state: RootState) =>
  state.selectedMovie.value;

export default selectedMoviesSlice.reducer;
