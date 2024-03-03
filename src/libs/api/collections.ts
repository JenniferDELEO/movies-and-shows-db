import axios from "axios";
import { Collection } from "@/models/collections";

export const optionsGET = {
  method: "GET",
  url: "",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  },
};

export async function getCollection(collectionId: number): Promise<Collection> {
  try {
    const response = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/collection/${collectionId}`,
      params: {
        language: "fr-FR",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
