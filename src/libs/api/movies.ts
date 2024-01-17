import { ApiResultMovies } from "@/models/movies";
import { optionsGET } from "./auth";
import { Watcher } from "@/models/watchers";

export async function getPopularMovies(): Promise<ApiResultMovies> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/popular?language=fr-FR&page=1`,
      optionsGET,
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
      optionsGET,
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
      optionsGET,
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSearchMovies(
  query: string,
  page: number,
): Promise<ApiResultMovies> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/search/movie?language=fr-FR&include_adult=false&region=fr&page=${page}&query=${query}`,
      optionsGET,
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserFavoriteMovies(
  accountIdV4: string,
): Promise<ApiResultMovies> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/movie/favorites?page=1&language=fr-FR`,
      optionsGET,
    );
    const json = await result.json();

    if (json.total_pages > 1) {
      const promises = [];
      for (let i = 2; i <= json.total_pages; i++) {
        promises.push(
          fetch(
            `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/movie/favorites?page=${i}&language=fr-FR`,
            optionsGET,
          ),
        );
      }
      const responses = await Promise.all(promises);
      const jsons = await Promise.all(
        responses.map((response) => response.json()),
      );
      json.results = json.results.concat(...jsons.map((json) => json.results));
    }

    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserRatedMovies(
  accountIdV4: string,
): Promise<ApiResultMovies> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/movie/rated?page=1&language=fr-FR`,
      optionsGET,
    );
    const json = await result.json();

    if (json.total_pages > 1) {
      const promises = [];
      for (let i = 2; i <= json.total_pages; i++) {
        promises.push(
          fetch(
            `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/movie/rated?page=${i}&language=fr-FR`,
            optionsGET,
          ),
        );
      }
      const responses = await Promise.all(promises);
      const jsons = await Promise.all(
        responses.map((response) => response.json()),
      );
      json.results = json.results.concat(...jsons.map((json) => json.results));
    }

    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserWatchListMovies(
  accountIdV4: string,
): Promise<ApiResultMovies> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/movie/watchlist?page=1&language=fr-FR`,
      optionsGET,
    );
    const json = await result.json();

    if (json.total_pages > 1) {
      const promises = [];
      for (let i = 2; i <= json.total_pages; i++) {
        promises.push(
          fetch(
            `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/movie/watchlist?page=${i}&language=fr-FR`,
            optionsGET,
          ),
        );
      }
      const responses = await Promise.all(promises);
      const jsons = await Promise.all(
        responses.map((response) => response.json()),
      );
      json.results = json.results.concat(...jsons.map((json) => json.results));
    }

    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMoviesProviders(): Promise<{
  results: Watcher[];
}> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/watch/providers/movie?language=fr-FR&watch_region=fr`,
      optionsGET,
    );
    return result.json();
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
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/${movieId}/rating`,
      {
        ...optionsGET,
        method: "POST",
        headers: {
          ...optionsGET.headers,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ value: rate }),
      },
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteRateMovie(
  movieId: number,
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/movie/${movieId}/rating`,
      {
        ...optionsGET,
        method: "DELETE",
        headers: {
          ...optionsGET.headers,
          "Content-Type": "application/json;charset=utf-8",
        },
      },
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
