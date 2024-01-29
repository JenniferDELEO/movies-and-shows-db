import axios from "axios";

import { ApiResultMovies, Image, MovieDetails, Video } from "@/models/movies";
import { optionsGET } from "./auth";
import { Watcher } from "@/models/watchers";
import { MoviesFilters } from "@/models/filters";
import { defaultMoviesFilters } from "../helpers/filters";
import { CastMovies, CrewMovies } from "@/models/people";

/* --------------------GLOBAL-------------------- */

export async function getGenresMovies(): Promise<{
  genres: { id: number; name: string }[];
}> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/genre/movie/list?language=fr`,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/* --------------------HOME PAGE-------------------- */

export async function getPopularMovies(page: number): Promise<ApiResultMovies> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/popular?language=fr-FR&page=${page}`,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopRatedMovies(): Promise<ApiResultMovies> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/top_rated?language=fr-FR&page=1`,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/* --------------------DISCOVER PAGE-------------------- */

export async function getDiscoverMovies(
  filters?: MoviesFilters,
): Promise<ApiResultMovies> {
  let queryFilters: MoviesFilters = defaultMoviesFilters;
  if (filters) queryFilters = { ...defaultMoviesFilters, ...filters };
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/discover/movie`,
      params: queryFilters,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMoviesProviders(): Promise<{
  results: Watcher[];
}> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/watch/providers/movie?language=fr-FR&watch_region=fr`,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/* --------------------DETAILS PAGE-------------------- */

export async function getMovieDetail(id: string): Promise<MovieDetails> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/${id}`,
      params: {
        append_to_response:
          "account_states,credits,recommendations,release_dates,similar,videos",
        language: "fr-FR",
      },
    });
    const data = result.data;

    const images = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/${id}/images`,
    });

    const responseWatchProviders = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/${id}/watch/providers`,
    });
    const watchProvidersFr = responseWatchProviders.data.results?.FR?.flatrate;

    return {
      ...data,
      images: images.data,
      watch_providers_fr: watchProvidersFr || {},
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCreditsMovie(
  id: string,
): Promise<{ id: number; cast: CastMovies[]; crew: CrewMovies[] }> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/${id}/credits`,
      params: {
        language: "fr-FR",
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getImagesMovie(id: string): Promise<{
  backdrops: Image[];
  id: number;
  logos: Image[];
  posters: Image[];
}> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/${id}/images`,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSimilarsMovie(
  id: string,
  page: number,
): Promise<ApiResultMovies> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/${id}/similar`,
      params: {
        language: "fr-FR",
        page,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRecommendationsMovie(
  id: string,
  page: number,
): Promise<ApiResultMovies> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/${id}/recommendations`,
      params: {
        language: "fr-FR",
        page,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getVideosMovie(id: string): Promise<{
  id: number;
  results: Video[];
}> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/${id}/videos`,
      params: { language: "fr-FR" },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/* --------------------SEARCH PAGE-------------------- */

export async function getSearchMovies(
  query: string,
  page: number,
): Promise<ApiResultMovies> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/search/movie`,
      params: {
        include_adult: "false",
        language: "fr-FR",
        region: "fr",
        page,
        query,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/* --------------------USER INTERACTIONS-------------------- */

export async function getUserFavoriteMovies(
  accountIdV4: string,
): Promise<ApiResultMovies> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/movie/favorites?page=1&language=fr-FR`,
    });
    let data = result.data;

    if (data.total_pages > 1) {
      const promises = [];
      for (let i = 2; i <= data.total_pages; i++) {
        promises.push(
          axios.request({
            ...optionsGET,
            url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/movie/favorites?page=${i}&language=fr-FR`,
          }),
        );
      }
      const responses = await Promise.all(promises);
      const datas = responses.map((response) => response.data);

      data.results = data.results.concat(...datas.map((data) => data.results));
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserRatedMovies(
  accountIdV4: string,
): Promise<ApiResultMovies> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/movie/rated?page=1&language=fr-FR`,
    });
    let data = result.data;

    if (data.total_pages > 1) {
      const promises = [];
      for (let i = 2; i <= data.total_pages; i++) {
        promises.push(
          axios.request({
            ...optionsGET,
            url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/movie/rated?page=${i}&language=fr-FR`,
          }),
        );
      }
      const responses = await Promise.all(promises);
      const datas = responses.map((response) => response.data);

      data.results = data.results.concat(...datas.map((data) => data.results));
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserWatchListMovies(
  accountIdV4: string,
): Promise<ApiResultMovies> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/movie/watchlist?page=1&language=fr-FR`,
    });
    let data = result.data;

    if (data.total_pages > 1) {
      const promises = [];
      for (let i = 2; i <= data.total_pages; i++) {
        promises.push(
          axios.request({
            ...optionsGET,
            url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/movie/watchlist?page=${i}&language=fr-FR`,
          }),
        );
      }
      const responses = await Promise.all(promises);
      const datas = responses.map((response) => response.data);

      data.results = data.results.concat(...datas.map((data) => data.results));
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addRateMovie(
  movieId: number,
  rate: number,
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await axios.request({
      ...optionsGET,
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/${movieId}/rating`,
      headers: {
        ...optionsGET.headers,
        "content-type": "application/json;charset=utf-8",
      },
      data: { value: rate },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteRateMovie(
  movieId: number,
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await axios.request({
      ...optionsGET,
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/${movieId}/rating`,
      headers: {
        ...optionsGET.headers,
        "content-type": "application/json;charset=utf-8",
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
