import { InternalEpisode, UserEpisode } from "./episode";
import { InternalTv } from "./tvs";

export type InternalSeason = {
  _id: string;
  tv_name: string;
  season_number: number;
  tv: InternalTv;
  number_of_episodes: number;
  release_date: string;
  tmdb_id: number;
  episodes: InternalEpisode[];
};

export type InternalSeasonAndUser = {
  _id: string;
  user_name: string;
  tv: InternalTv;
  season: InternalSeason;
  watched_episodes: UserEpisode[];
};

export type AddSeason = {
  tvName: string;
  seasonNumber: number;
  tvId: string;
  numberOfEpisodes: number;
  releaseDate: string;
  tmdbId: number;
  episodes: InternalEpisode[];
};

export type AddEpisodesBySeason = {
  seasonId: string;
  numberOfEpisodes: number;
  episodes: InternalEpisode[];
};

export type AddUserSeason = {
  userName: string;
  userId: string;
  tvId: string;
  seasonId: string;
  episodes: {
    episode: {
      id: number;
      season_number: number;
      episode_number: number;
    };
    watched: boolean;
  }[];
};

export type AddEpisodesByUserSeason = {
  userSeasonId: string;
  episodes: {
    episode: {
      id: number;
      season_number: number;
      episode_number: number;
    };
    watched: boolean;
  }[];
};

export type UpdateEpisodeStatus = {
  userSeasonId: string;
  episodes: UserEpisode[];
};
