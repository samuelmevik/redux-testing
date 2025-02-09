import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Movie = {
  id: number;
  name: string;
};

const initialState: { movies: Movie[] } = {
  movies: [
    {
      id: 1,
      name: "Interstellar",
    },
    {
      id: 2,
      name: "Hemi",
    },
  ],
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<string>) => {
      const movie = {
        id: state.movies[state.movies.length - 1]?.id + 1,
        name: action.payload,
      };
      state.movies = [...state.movies, movie];
    },
    removeMovie: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { addMovie, removeMovie } = movieSlice.actions;
export default movieSlice.reducer;
