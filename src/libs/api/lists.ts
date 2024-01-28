import axios from "axios";
import { optionsGET } from "./auth";

export async function getLists() {
  const accountIdV4 = localStorage.getItem("account_id_v4");
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/lists?page=1`,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function checkItemStatus(
  listId: number,
  itemId: number,
  itemType: string,
) {
  try {
    const result = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/list/${listId}/item_status?media_id=${itemId}&media_type=${itemType === "movie" ? "movie" : "tv"}`,
    });
    return result.data;
  } catch (error: any) {
    if (error.response.status === 404) return { item_present: false };
    throw error;
  }
}

export async function addItemsToList(
  listId: number,
  items: { media_type: string; media_id: number }[],
) {
  try {
    const writeAccessToken = localStorage.getItem("access_token");
    const result = await axios.request({
      ...optionsGET,
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/list/${listId}/items`,
      headers: {
        ...optionsGET.headers,
        Authorization: `Bearer ${writeAccessToken}`,
        "content-type": "application/json",
      },
      data: { items },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
