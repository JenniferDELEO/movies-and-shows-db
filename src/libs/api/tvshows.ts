import { ApiResultTvShows, TvShow } from "@/models/tvShows";
import { optionsGET } from "./auth";
import { Watcher } from "@/models/watchers";
import axios from "axios";
import { Filters } from "@/models/filters";
import { defaultFilters } from "../helpers/filters";

export async function getPopularTvShows(
  page: number,
): Promise<ApiResultTvShows> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/popular?language=fr-FR&page=${page}`,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopRatedTvShows(): Promise<ApiResultTvShows> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/top_rated?language=fr-FR&page=1`,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getDiscoverTvShows(
  filters?: Filters,
): Promise<ApiResultTvShows> {
  let queryFilters: Filters = defaultFilters;
  if (filters) queryFilters = { ...defaultFilters, ...filters };
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/discover/tv?language=fr-FR&page=1`,
      params: queryFilters,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getGenresTvShows(): Promise<{
  genres: { id: number; name: string }[];
}> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/genre/tv/list?language=fr`,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSearchTvShows(
  query: string,
  page: number,
): Promise<ApiResultTvShows> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/search/tv`,
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

export async function getUserFavoriteTvShows(
  accountIdV4: string,
): Promise<ApiResultTvShows> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/tv/favorites?page=1&language=fr-FR`,
    });
    let data = result.data;

    if (data.total_pages > 1) {
      const promises = [];
      for (let i = 2; i <= data.total_pages; i++) {
        promises.push(
          axios.request({
            ...optionsGET,
            url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/tv/favorites?page=${i}&language=fr-FR`,
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

export async function getUserRatedTvShows(
  accountIdV4: string,
): Promise<ApiResultTvShows> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/tv/rated?page=1&language=fr-FR`,
    });
    let data = result.data;

    if (data.total_pages > 1) {
      const promises = [];
      for (let i = 2; i <= data.total_pages; i++) {
        promises.push(
          axios.request({
            ...optionsGET,
            url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/tv/rated?page=${i}&language=fr-FR`,
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

export async function getUserWatchlistTvShows(
  accountIdV4: string,
): Promise<ApiResultTvShows> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/tv/watchlist?page=1&language=fr-FR`,
    });
    let data = result.data;

    if (data.total_pages > 1) {
      const promises = [];
      for (let i = 2; i <= data.total_pages; i++) {
        promises.push(
          axios.request({
            ...optionsGET,
            url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/tv/watchlist?page=${i}&language=fr-FR`,
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

export async function getTvShowsProviders(): Promise<{
  results: Watcher[];
}> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/watch/providers/tv?language=fr-FR&watch_region=fr`,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addRateTvShow(
  tvShowId: number,
  rate: number,
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await axios.request({
      ...optionsGET,
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvShowId}/rating`,
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

export async function deleteRateTvShow(
  tvShowId: number,
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await axios.request({
      ...optionsGET,
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvShowId}/rating`,
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
