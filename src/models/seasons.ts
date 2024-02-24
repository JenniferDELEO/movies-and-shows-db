import { InternalTv } from "./tvs";

export type InternalSeason = {
  _id: string;
  tv_name: string;
  season_number: number;
  tv: InternalTv;
  number_of_episodes: number;
  release_date: string;
  tmdb_id: number;
};

export type InternalSeasonAndUser = {
  _id: string;
  user_name: string;
  tv: InternalTv;
  season: InternalSeason;
  account_states: {
    all_watched: boolean;
  };
};

export type AddSeason = {
  tvName: string;
  seasonNumber: number;
  tvId: string;
  numberOfEpisodes: number;
  releaseDate: string;
  tmdbId: number;
};

export type UpdateSeason = {
  seasonId: string;
  numberOfEpisodes: number;
};

export type CreateSeasonStatus = {
  userName: string;
  userId: string;
  tvId: string;
  seasonId: string;
  allWatched: boolean;
};

export type UpdateSeasonStatus = {
  userSeasonId: string;
  allWatched: boolean;
};
