import { optionsGET } from "./auth";

export async function toggleFavorite(
  accountIdV3: number,
  sessionId: string,
  item: { media_type: string; media_id: number; favorite: boolean },
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/account/${accountIdV3}/favorite?session_id=${sessionId}`,
      {
        ...optionsGET,
        method: "POST",
        headers: {
          ...optionsGET.headers,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...item,
        }),
      },
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleWatchlist(
  accountIdV3: number,
  sessionId: string,
  item: { media_type: string; media_id: number; watchlist: boolean },
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/account/${accountIdV3}/watchlist`,
      {
        ...optionsGET,
        method: "POST",
        headers: {
          ...optionsGET.headers,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...item,
        }),
      },
    );
    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
