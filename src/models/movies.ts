import { Credits } from "./people";

export type AccountRating = {
  created_at: string;
  value: number;
};

export type Movie = {
  adulte: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  account_rating: AccountRating;
};

export type Collection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type AccountStates = {
  favorite: boolean;
  rated: boolean;
  watchlist: boolean;
};

export type Image = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type ReleaseDates = {
  iso_3166_1: string;
  release_dates: {
    certification: string;
    descriptors: any[];
    iso_639_1: string;
    note: string;
    release_date: string;
    type: number;
  };
};

export type Video = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
};

export interface MovieDetails extends Movie {
  belongs_to_collection: Collection;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  account_states: AccountStates;
  credits: Credits;
  images: {
    backdrops: Image[];
    id: number;
    logos: Image[];
    posters: Image[];
  };
  recommendations: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
  release_dates: {
    results: {
      id: number;
      results: ReleaseDates[];
    };
  };
  similar: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
  videos: {
    id: number;
    results: Video[];
  };
}

export type ApiResultMovies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
