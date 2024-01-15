import { ApiResultTvShows, TvShow } from "@/models/tvShows";
import { optionsGET } from "./auth";

export async function getPopularTvShows(): Promise<ApiResultTvShows> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/popular?language=fr-FR&page=1`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopRatedTvShows(): Promise<ApiResultTvShows> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/top_rated?language=fr-FR&page=1`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getGenresTvShows(): Promise<{
  genres: { id: number; name: string }[];
}> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/genre/tv/list?language=fr`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSearchTvShows(
  query: string,
  page: number
): Promise<ApiResultTvShows> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/search/tv?language=fr-FR&include_adult=false&region=fr&page=${page}&query=${query}`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
