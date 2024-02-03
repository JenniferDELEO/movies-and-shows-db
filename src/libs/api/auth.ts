import axios from "axios";

export const optionsGET = {
  method: "GET",
  url: "",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  },
};

export async function getRequestToken(): Promise<{
  success: boolean;
  expires_at: string;
  request_token: string;
}> {
  try {
    const responseRequestToken = await axios.request({
      ...optionsGET,
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/auth/request_token`,
      headers: {
        ...optionsGET.headers,
        "content-type": "application/json",
      },
      data: { redirect_to: `${process.env.NEXT_PUBLIC_URL}/profile` },
    });
    const responseJsonRequestToken = responseRequestToken.data;
    localStorage.setItem(
      "request_token",
      responseJsonRequestToken.request_token,
    );
    return responseJsonRequestToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAccessToken(requestToken: string): Promise<{
  access_token: string;
  account_id: string;
  status_code: number;
  status_message: string;
  success: boolean;
}> {
  try {
    const responseAccessToken = await axios.request({
      ...optionsGET,
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V4}/auth/access_token`,
      headers: {
        ...optionsGET.headers,
        "content-type": "application/json",
      },
      data: { request_token: requestToken },
    });
    const responseJsonAccessToken = responseAccessToken.data;
    localStorage.setItem(
      "tmdb_account_id_v4",
      responseJsonAccessToken.account_id,
    );
    localStorage.setItem(
      "tmdb_access_token",
      responseJsonAccessToken.access_token,
    );
    localStorage.removeItem("request_token");
    return responseJsonAccessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createSessionFromV4(accessToken: string): Promise<{
  success: boolean;
  session_id: string;
}> {
  try {
    const responseCreateSession = await axios.request({
      ...optionsGET,
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_TMDB_API_URL_V3}/authentication/session/convert/4`,
      headers: {
        ...optionsGET.headers,
        "content-type": "application/json",
      },
      data: { access_token: accessToken },
    });
    const responseJsonCreateSession = responseCreateSession.data;
    localStorage.setItem(
      "tmdb_session_id",
      responseJsonCreateSession.session_id,
    );
    return responseJsonCreateSession;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
