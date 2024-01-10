import { Movie } from "@/models/movies";
import { optionsGET } from "./auth";

export async function getPopularMovies(): Promise<{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/popular?language=fr-FR&page=1`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopRatedMovies(): Promise<{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/top_rated?language=fr-FR&page=1`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
