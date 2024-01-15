"use client";

import { UserContext } from "@/context/userContext";
import React, { useEffect, useState } from "react";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const localUsername =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("account_username")
      : null;
  const localAccountIdV3 =
    typeof localStorage !== "undefined"
      ? Number(localStorage.getItem("account_id_v3"))
      : null;
  const localAccountIdV4 =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("account_id_v4")
      : null;
  const localSessionId =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("session_id")
      : null;

  const [renderComponent, setRenderComponent] = useState<boolean>(false);
  const [user, setUser] = useState({
    username: localUsername,
    accountIdV3: localAccountIdV3,
    accountIdV4: localAccountIdV4,
    sessionId: localSessionId,
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
