import { TvShow } from "@/models/tvShows";
import { optionsGET } from "./auth";

export async function getPopularTvShows(): Promise<{
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/popular?language=fr-FR&page=1`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopRatedTvShows(): Promise<{
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/top_rated?language=fr-FR&page=1`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
