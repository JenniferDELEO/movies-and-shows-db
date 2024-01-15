import { optionsGET } from "./auth";

export async function getSearchResults(
  query: string,
  page: number
): Promise<{
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/search/multi?query=${query}&include_adult=false&language=fr-FR&page=${page}`,
      optionsGET
    );

    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
