/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import { InternalUserContext } from "@/context/internalUserContext";
import { UserContext } from "@/context/userContext";
import { createSessionFromV4, getAccessToken } from "@/libs/api/auth";
import { getAccountDetails } from "@/libs/api/user";
import { InternalUser } from "@/models/user";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

const Profile = () => {
  const router = useRouter();
  const [requestToken, setRequestToken] = useState<string | null>(null);

  const {
    user: { tmdb_username, tmdb_accountIdV3, tmdb_accountIdV4, tmdb_sessionId },
    setUser,
  } = useContext(UserContext);

  async function getUserAccount() {
    if (!requestToken) return;
    const responseJsonSession = await getAccessToken(requestToken);

    const responseJsonCreateSession = await createSessionFromV4(
      responseJsonSession.access_token,
    );

    await getAccountDetails(responseJsonCreateSession.session_id);
  }

  useEffect(() => {
    setRequestToken(localStorage.getItem("request_token"));

    if (requestToken) {
      getUserAccount();
    }
  }, [requestToken]);

  return (
    <div>
      <WorkInProgress />
    </div>
  );
};

export default Profile;
