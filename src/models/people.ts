import { Image, Movie } from "./movies";
import { Tv } from "./tvs";

export type CreditsMovies = {
  id: number;
  cast: CastMovies[];
  crew: CrewMovies[];
};

export type CreditsTvs = {
  id: number;
  cast: CastTvs[];
  crew: CrewTvs[];
};

export type KnownFor = {
  adult: boolean;
  backdrop_path: string;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name?: string;
  original_language: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  release_date?: string;
  title?: string;
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
    cast: Tv[];
    crew: Tv[];
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

export type RoleCastTv = {
  credit_id: string;
  character: string;
  episode_count: number;
};

export type JobsCrewTv = {
  credit_id: string;
  job: string;
  episode_count: number;
};

export type CrewTvs = {
  adult: boolean;
  department: string;
  gender: number;
  id: number;
  jobs: JobsCrewTv[];
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

export type CastTvs = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  roles: RoleCastTv[];
  total_episode_count: number;
};
