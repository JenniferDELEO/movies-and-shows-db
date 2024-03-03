import {
  ApiResultTvShows,
  EpisodeDetails,
  SeasonDetails,
  TvShowDetails,
} from "@/models/tvShows";
import { optionsGET } from "./collections";
import { Watcher } from "@/models/watchers";
import axios from "axios";
import { TvShowsFilters } from "@/models/filters";
import { defaultTvShowsFilters } from "../helpers/filters";
import { CastTvShows, CrewTvShows } from "@/models/people";
import { Image, Video } from "@/models/movies";

/* --------------------GLOBAL-------------------- */

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

/* --------------------HOME PAGE-------------------- */

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

export async function getTrendingTvShows(
  timeWindow: string,
): Promise<ApiResultTvShows> {
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

export async function getDiscoverTvShows(
  filters?: TvShowsFilters,
): Promise<ApiResultTvShows> {
  let queryFilters: TvShowsFilters = defaultTvShowsFilters;
  if (filters) queryFilters = { ...defaultTvShowsFilters, ...filters };
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

/* --------------------DETAILS PAGE-------------------- */

export async function getTvShowDetail(id: string): Promise<TvShowDetails> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${id}`,
      params: {
        append_to_response: "aggregate_credits,recommendations,similar,videos",
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

export async function getCreditsTvShow(
  id: string,
): Promise<{ id: number; cast: CastTvShows[]; crew: CrewTvShows[] }> {
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
  tvShowId: number,
  seasonNumber: number,
  episodeNumber: number,
): Promise<EpisodeDetails> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}`,
      params: {
        language: "fr-FR",
      },
    });
    const data = result.data;

    const credits = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}/credits`,
      params: {
        language: "fr-FR",
      },
    });

    const images = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}/images`,
    });

    const videos = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}/videos`,
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

export async function getImagesTvShow(id: string): Promise<{
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
  tvShowId: number,
  seasonNumber: number,
): Promise<SeasonDetails> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvShowId}/season/${seasonNumber}`,
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

export async function getSimilarsTvShow(
  id: string,
  page: number,
): Promise<ApiResultTvShows> {
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

export async function getVideosTvShow(id: string): Promise<{
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
