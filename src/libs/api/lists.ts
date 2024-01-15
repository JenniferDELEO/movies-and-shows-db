import { optionsGET } from "./auth";

export async function getLists() {
  const accountIdV4 = localStorage.getItem("account_id_v4");
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/account/${accountIdV4}/lists?page=1`,
      optionsGET,
    );
    return result.json();
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
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/list/${listId}/item_status?media_id=${itemId}&media_type=${itemType}`,
      optionsGET,
    );
    return result.json();
  } catch (error) {
    throw error;
  }
}

export async function addItemsToList(
  listId: number,
  items: { media_type: string; media_id: number }[],
) {
  try {
    const writeAccessToken = localStorage.getItem("access_token");
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/list/${listId}/items`,
      {
        ...optionsGET,
        method: "POST",
        headers: {
          ...optionsGET.headers,
          Authorization: `Bearer ${writeAccessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          items,
        }),
      },
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
