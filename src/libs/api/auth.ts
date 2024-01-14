import { AccountDetail } from "@/models/user";

export const optionsGET = {
  method: "GET",
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
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/authentication/token/new`,
      optionsGET
    );
    const resultJson = await result.json();
    localStorage.setItem("request_token", resultJson.request_token);
    return resultJson;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserSessionId(requestToken: string): Promise<{
  success: boolean;
  session_id: string;
}> {
  const optionsPOST = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    body: JSON.stringify({
      request_token: requestToken,
    }),
  };
  try {
    const responsePostSession = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/authentication/session/new`,
      optionsPOST
    );
    const responseJsonSession = await responsePostSession.json();
    localStorage.setItem("session_id", responseJsonSession.session_id);
    localStorage.removeItem("request_token");
    return responseJsonSession;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAccountDetails(
  sessionId: string
): Promise<AccountDetail> {
  try {
    const responseFetchAccount = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/account?session_id=${sessionId}`,
      optionsGET
    );
    const responseJsonAccount = await responseFetchAccount.json();
    localStorage.setItem("account_id", responseJsonAccount.id);
    localStorage.setItem("account_username", responseJsonAccount.username);
    return responseJsonAccount;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
