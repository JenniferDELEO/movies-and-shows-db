import { Episode } from "./tvs";

export type InternalEpisode = {
  _key?: string;
  episode_title: string;
  episode_number: number;
  episode_total_number: number;
  season_number: number;
  episode_release_date: string;
  episode_runtime: number;
  tmdb_id: number;
};

export type UserEpisode = {
  _key: string;
  season_number: number;
  episode_number: number;
  watched: boolean;
};

export type AddEpisode = {
  episodeTitle: string;
  episodeNumber: number;
  episodeTotalNumber: number;
  seasonNumber: number;
  episodeReleaseDate: string;
  episodeRuntime: number;
  tmdbId: number;
  tvId: string;
  seasonId: string;
};

export type EpisodeFromUI = {
  episode: Episode;
  watched: boolean;
};

export type CreateEpisodeStatus = {
  userName: string;
  userId: string;
  tvId: string;
  seasonId: string;
  episodeId: string;
  watched: boolean;
};

export type UpdateEpisodeStatus = {
  userEpisodeId: string;
  watched: boolean;
};
