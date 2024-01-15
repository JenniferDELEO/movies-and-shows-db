import { ApiResultMovies } from "@/models/movies";
import { optionsGET } from "./auth";

export async function getPopularMovies(): Promise<ApiResultMovies> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/popular?language=fr-FR&page=1`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopRatedMovies(): Promise<ApiResultMovies> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/top_rated?language=fr-FR&page=1`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getGenresMovies(): Promise<{
  genres: { id: number; name: string }[];
}> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/genre/movie/list?language=fr`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSearchMovies(
  query: string,
  page: number
): Promise<ApiResultMovies> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/search/movie?language=fr-FR&include_adult=false&region=fr&page=${page}&query=${query}`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
