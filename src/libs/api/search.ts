import axios from "axios";
import { optionsGET } from "./auth";

export async function getSearchResults(
  query: string,
  page: number,
): Promise<{
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/search/multi?query=${query}&include_adult=false&language=fr-FR&page=${page}`,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
