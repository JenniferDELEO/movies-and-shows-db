import axios from "axios";
import { optionsGET } from "./auth";
import { AccountDetail } from "@/models/user";

export async function getAccountDetails(
  sessionId: string,
): Promise<AccountDetail> {
  try {
    const responseFetchAccount = await axios.request({
      ...optionsGET,
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/account?session_id=${sessionId}`,
    });
    const responseJsonAccount = responseFetchAccount.data;
    localStorage.setItem("tmdb_account_id_v3", responseJsonAccount.id);
    localStorage.setItem("tmdb_account_username", responseJsonAccount.username);
    return responseJsonAccount;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleFavorite(
  accountIdV3: number,
  sessionId: string,
  item: { media_type: string; media_id: number; favorite: boolean },
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  try {
    const result = await axios.request({
      ...optionsGET,
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/account/${accountIdV3}/favorite?session_id=${sessionId}`,
      headers: {
        ...optionsGET.headers,
        "content-type": "application/json",
      },
      data: { ...item },
    });
    return result.data;
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
    const result = await axios.request({
      ...optionsGET,
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/account/${accountIdV3}/watchlist`,
      headers: {
        ...optionsGET.headers,
        "content-type": "application/json",
      },
      data: { ...item },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
