import { ApiResultTvShows, TvShow } from "@/models/tvShows";
import { optionsGET } from "./auth";

export async function getPopularTvShows(): Promise<ApiResultTvShows> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/popular?language=fr-FR&page=1`,
      optionsGET,
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
      optionsGET,
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
      optionsGET,
    );
    return result.json();
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
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/search/tv?language=fr-FR&include_adult=false&region=fr&page=${page}&query=${query}`,
      optionsGET,
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserFavoriteTvShows(
  accountIdV4: string,
): Promise<ApiResultTvShows> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/tv/favorites?page=1&language=fr-FR`,
      optionsGET,
    );
    const json = await result.json();

    if (json.total_pages > 1) {
      const promises = [];
      for (let i = 2; i <= json.total_pages; i++) {
        promises.push(
          fetch(
            `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/tv/favorites?page=${i}&language=fr-FR`,
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

export async function getUserRatedTvShows(
  accountIdV4: string,
): Promise<ApiResultTvShows> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/tv/rated?page=1&language=fr-FR`,
      optionsGET,
    );
    const json = await result.json();

    if (json.total_pages > 1) {
      const promises = [];
      for (let i = 2; i <= json.total_pages; i++) {
        promises.push(
          fetch(
            `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/tv/rated?page=${i}&language=fr-FR`,
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

export async function getUserWatchlistTvShows(
  accountIdV4: string,
): Promise<ApiResultTvShows> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/tv/watchlist?page=1&language=fr-FR`,
      optionsGET,
    );
    const json = await result.json();

    if (json.total_pages > 1) {
      const promises = [];
      for (let i = 2; i <= json.total_pages; i++) {
        promises.push(
          fetch(
            `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/tv/watchlist?page=${i}&language=fr-FR`,
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

export async function addRateTvShow(
  tvShowId: number,
  rate: number,
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvShowId}/rating`,
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

export async function deleteRateTvShow(
  tvShowId: number,
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/tv/${tvShowId}/rating`,
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
