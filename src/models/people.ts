import { Movie } from "./movies";
import { TvShow } from "./tvShows";

export type Credits = {
  cast: Cast[];
  crew: CastAndCrew[];
};

export type People = {
  adulte: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  images: { profiles: any[] };
  movie_credits: {
    cast: Movie[];
    crew: Movie[];
  };
  tv_credits: {
    cast: TvShow[];
    crew: TvShow[];
  };
  known_for: any[];
};

export type ApiResultPeople = {
  page: number;
  results: People[];
  total_pages: number;
  total_results: number;
};

export type CastAndCrew = {
  adult: boolean;
  credit_id: string;
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

export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};
