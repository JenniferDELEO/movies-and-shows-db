import { Movie } from "@/models/movies";
import { TvShow } from "@/models/tvShows";

const optionsGET = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  },
};

export async function getDiscoverMovies(
  page: string = "1",
  sortBy: string
): Promise<{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${page}&region=fr&sort_by=${sortBy}.desc`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getDiscoverTvShows(
  page: string = "1",
  sortBy: string
): Promise<{
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=${page}&sort_by=${sortBy}.desc`,
      optionsGET
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
