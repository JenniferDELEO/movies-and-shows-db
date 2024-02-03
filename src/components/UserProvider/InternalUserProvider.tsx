/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";

import { InternalUserContext } from "@/context/internalUserContext";

const InternalUserProvider = ({ children }: { children: React.ReactNode }) => {
  const localId =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("user_id")
      : null;
  const localName =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("user_name")
      : null;
  const localEmail =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("user_email")
      : null;
  const localImage =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("user_image")
      : null;

  const [renderComponent, setRenderComponent] = useState<boolean>(false);
  const [internalUser, setInternalUser] = useState({
    user_id: localId,
    user_name: localName,
    user_email: localEmail,
    user_image: localImage,
  });

  useEffect(() => {
    setRenderComponent(true);
  }, []);

  if (!renderComponent) return <></>;

  return (
    <InternalUserContext.Provider value={{ internalUser, setInternalUser }}>
      {children}
    </InternalUserContext.Provider>
  );
};

export default InternalUserProvider;
