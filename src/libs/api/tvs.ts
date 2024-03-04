import {
  ApiResultTvs,
  EpisodeDetails,
  SeasonDetails,
  TvDetails,
} from "@/models/tvs";
import { optionsGET } from "./collections";
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
        append_to_response: "aggregate_credits,similar,videos",
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

export async function getSeasonDetails(
  tvId: number,
  seasonNumber: number,
): Promise<SeasonDetails> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvId}/season/${seasonNumber}`,
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
