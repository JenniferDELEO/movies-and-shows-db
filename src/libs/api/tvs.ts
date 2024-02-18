import {
  ApiResultTvs,
  EpisodeDetails,
  SeasonDetails,
  TvDetails,
} from "@/models/tvs";
import { optionsGET } from "./auth";
import { Watcher } from "@/models/watchers";
import axios from "axios";
import { TvsFilters } from "@/models/filters";
import { defaultTvsFilters } from "../helpers/filters";
import { CastTvs, CrewTvs } from "@/models/people";
import { Image, Video } from "@/models/movies";

/* --------------------GLOBAL-------------------- */

export async function getGenresTvs(): Promise<{
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

/* --------------------HOME PAGE-------------------- */

export async function getPopularTvs(page: number): Promise<ApiResultTvs> {
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

export async function getTopRatedTvs(): Promise<ApiResultTvs> {
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

export async function getTrendingTvs(
  timeWindow: string,
): Promise<ApiResultTvs> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/trending/tv/${timeWindow}?language=fr-FR&page=1`,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/* --------------------DISCOVER PAGE-------------------- */

export async function getDiscoverTvs(
  filters?: TvsFilters,
): Promise<ApiResultTvs> {
  let queryFilters: TvsFilters = defaultTvsFilters;
  if (filters) queryFilters = { ...defaultTvsFilters, ...filters };
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/discover/tv`,
      params: queryFilters,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTvsProviders(): Promise<{
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

/* --------------------DETAILS PAGE-------------------- */

export async function getTvDetail(id: string): Promise<TvDetails> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${id}`,
      params: {
        append_to_response:
          "account_states,aggregate_credits,recommendations,similar,videos",
        language: "fr-FR",
      },
    });
    const data = result.data;

    const images = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${id}/images`,
    });

    const responseWatchProviders = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${id}/watch/providers`,
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

export async function getTvDetailForDb(id: string): Promise<TvDetails> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${id}`,
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

export async function getCreditsTv(
  id: string,
): Promise<{ id: number; cast: CastTvs[]; crew: CrewTvs[] }> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${id}/aggregate_credits`,
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

export async function getEpisodeDetails(
  tvId: number,
  seasonNumber: number,
  episodeNumber: number,
): Promise<EpisodeDetails> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`,
      params: {
        language: "fr-FR",
      },
    });
    const data = result.data;

    const accountStates = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/account_states`,
    });

    const credits = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/credits`,
      params: {
        language: "fr-FR",
      },
    });

    const images = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/images`,
    });

    const videos = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/videos`,
    });

    return {
      ...data,
      account_states: accountStates.data,
      credits: credits.data,
      images: images.data,
      videos: videos.data,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getImagesTv(id: string): Promise<{
  backdrops: Image[];
  id: number;
  logos: Image[];
  posters: Image[];
}> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${id}/images`,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRecommendationsTv(
  id: string,
  page: number,
): Promise<ApiResultTvs> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${id}/recommendations`,
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

export async function getSeasonDetails(
  tvId: number,
  seasonNumber: number,
): Promise<SeasonDetails> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvId}/season/${seasonNumber}`,
      params: {
        append_to_response: "account_states",
        language: "fr-FR",
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSimilarsTv(
  id: string,
  page: number,
): Promise<ApiResultTvs> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${id}/similar`,
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

export async function getVideosTv(id: string): Promise<{
  id: number;
  results: Video[];
}> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${id}/videos`,
      params: { language: "fr-FR" },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/* --------------------SEARCH PAGE-------------------- */

export async function getSearchTvs(
  query: string,
  page: number,
): Promise<ApiResultTvs> {
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

/* --------------------USER INTERACTIONS-------------------- */

export async function getUserFavoriteTvs(
  accountIdV4: string,
): Promise<ApiResultTvs> {
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

export async function getUserRatedTvs(
  accountIdV4: string,
): Promise<ApiResultTvs> {
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

export async function getUserWatchlistTvs(
  accountIdV4: string,
): Promise<ApiResultTvs> {
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

export async function addRateTv(
  tvId: number,
  rate: number,
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await axios.request({
      ...optionsGET,
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvId}/rating`,
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

export async function deleteRateTv(
  tvId: number,
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await axios.request({
      ...optionsGET,
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvId}/rating`,
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

export async function addRateTvEpisode(
  tvId: number,
  seasonNumber: number,
  episodeNumber: number,
  rate: number,
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await axios.request({
      ...optionsGET,
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/rating`,
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

export async function deleteRateTvEpisode(
  tvId: number,
  seasonNumber: number,
  episodeNumber: number,
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await axios.request({
      ...optionsGET,
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/rating`,
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
