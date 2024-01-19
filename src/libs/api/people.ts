import axios from "axios";
import { optionsGET } from "./auth";
import { ApiResultPeople, People } from "@/models/people";

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

export async function getPeopleDetail(id: string): Promise<People> {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/person/${id}`,
      params: {
        append_to_response: "latest,images,movie_credits,tv_credits",
        language: "fr-FR",
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
