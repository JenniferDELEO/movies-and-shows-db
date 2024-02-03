/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";

import { UserContext } from "@/context/userContext";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const localUsername =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tmdb_account_username")
      : null;
  const localAccountIdV3 =
    typeof localStorage !== "undefined"
      ? Number(localStorage.getItem("tmdb_account_id_v3"))
      : null;
  const localAccountIdV4 =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tmdb_account_id_v4")
      : null;
  const localSessionId =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tmdb_session_id")
      : null;

  const [renderComponent, setRenderComponent] = useState<boolean>(false);
  const [user, setUser] = useState({
    tmdb_username: localUsername,
    tmdb_accountIdV3: localAccountIdV3,
    tmdb_accountIdV4: localAccountIdV4,
    tmdb_sessionId: localSessionId,
  });

  useEffect(() => {
    setRenderComponent(true);
  }, []);

  if (!renderComponent) return <></>;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
