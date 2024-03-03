import {
  Genre,
  Image,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
  Video,
  WatchProviderFr,
} from "./movies";
import { CastMovies, CastTvShows, CreditsTvShows, CrewTvShows } from "./people";

export type ApiResultTvShows = {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
};

export type CreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
};

export type Episode = {
  air_date: string;
  crew: CrewTvShows[];
  episode_number: number;
  guest_stars: CastMovies[];
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
};

export interface EpisodeDetails extends Episode {
  credits: {
    id: number;
    cast: CastTvShows[];
    crew: CrewTvShows[];
    guest_stars: CastMovies[];
  };
  images: {
    id: number;
    stills: Image[];
  };
  videos: {
    id: number;
    results: Video[];
  };
}

export type EpisodeToAir = {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
};

export type Network = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type SeasonDetails = {
  _id: string;
  aggregate_credits: {
    id: number;
    cast: CastTvShows[];
    crew: CrewTvShows[];
  };
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type TvShow = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export interface TvShowDetails extends TvShow {
  aggregate_credits: CreditsTvShows;
  created_by: CreatedBy[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  images: {
    backdrops: Image[];
    id: number;
    logos: Image[];
    posters: Image[];
  };
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: EpisodeToAir;
  next_episode_to_air: EpisodeToAir | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  recommendations: {
    page: number;
    results: TvShow[];
    total_pages: number;
    total_results: number;
  };
  seasons: Season[];
  similar: {
    page: number;
    results: TvShow[];
    total_pages: number;
    total_results: number;
  };
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  videos: {
    id: number;
    results: Video[];
  };
  watch_providers_fr: WatchProviderFr[];
}
