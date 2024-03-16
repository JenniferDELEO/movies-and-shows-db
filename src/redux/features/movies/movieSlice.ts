import { getAllMovies } from "@/libs/sanity/api/movie";
import { InternalMovie } from "@/models/movies";
import { createAppSlice } from "@/redux/createAppSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface MovieSliceState {
  movies: InternalMovie[];
  status: "idle" | "loading" | "failed";
}

const initialState: MovieSliceState = {
  movies: [],
  status: "idle",
};

export const fetchAllMovies = createAsyncThunk(
  "movies/fetchAllMovies",
  async () => {
    const internalMovies = await getAllMovies();
    return internalMovies;
  },
);

export const movieSlice = createAppSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.status = "idle";
        state.movies = action.payload;
      })
      .addCase(fetchAllMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});
