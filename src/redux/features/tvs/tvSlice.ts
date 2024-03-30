import { getAllTvs } from "@/libs/sanity/api/tv";
import { InternalTv } from "@/models/tvs";
import { createAppSlice } from "@/redux/createAppSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface TvSliceState {
  tvs: InternalTv[];
  status: "idle" | "loading" | "failed";
}

const initialState: TvSliceState = {
  tvs: [],
  status: "idle",
};

export const fetchAllTvs = createAsyncThunk("tvs/fetchAllTvs", async () => {
  const internalTvs = await getAllTvs();
  return internalTvs;
});

export const tvSlice = createAppSlice({
  name: "tvs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTvs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTvs.fulfilled, (state, action) => {
        state.status = "idle";
        state.tvs = action.payload;
      })
      .addCase(fetchAllTvs.rejected, (state) => {
        state.status = "failed";
      });
  },
});
