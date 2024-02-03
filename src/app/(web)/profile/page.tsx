/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import { createSessionFromV4, getAccessToken } from "@/libs/api/auth";
import { getAccountDetails } from "@/libs/api/user";
import { useEffect, useState } from "react";

const Profile = () => {
  const [requestToken, setRequestToken] = useState<string | null>(null);

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
