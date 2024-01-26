import { Image, Movie } from "./movies";
import { TvShow } from "./tvShows";

export type CreditsMovies = {
  id: number;
  cast: CastMovies[];
  crew: CrewMovies[];
};

export type CreditsTvShows = {
  id: number;
  cast: CastTvShows[];
  crew: CrewTvShows[];
};

export type KnownFor = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type People = {
  adulte: boolean;
  gender: number;
  id: number;
  known_for: KnownFor[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string | null;
};

export interface Person extends People {
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  homepage: string | null;
  images: { id: number; profiles: Image[] };
  imdb_id: string;
  movie_credits: {
    cast: Movie[];
    crew: Movie[];
  };
  place_of_birth: string | null;
  tv_credits: {
    cast: TvShow[];
    crew: TvShow[];
  };
}

export type ApiResultPeople = {
  page: number;
  results: People[];
  total_pages: number;
  total_results: number;
};

export type CrewMovies = {
  adult: boolean;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

export type CastMovies = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

export type RoleCastTvShow = {
  credit_id: string;
  character: string;
  episode_count: number;
};

export type JobsCrewTvShow = {
  credit_id: string;
  job: string;
  episode_count: number;
};

export type CrewTvShows = {
  adult: boolean;
  department: string;
  gender: number;
  id: number;
  jobs: JobsCrewTvShow[];
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

export type CastTvShows = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  roles: RoleCastTvShow[];
  total_episode_count: number;
};
