import axios from "axios";
import { optionsGET } from "./auth";
import { ApiResultPeople } from "@/models/people";

export async function getPopularPeople(page: number): Promise<ApiResultPeople> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/person/popular`,
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

export async function getSearchPeople(
  query: string,
  page: number,
): Promise<ApiResultPeople> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/search/person`,
      params: {
        include_adult: "false",
        language: "fr-FR",
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
