"use client";

import { getRequestToken } from "@/libs/api/auth";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const RedirectionToTmdb = () => {
  const router = useRouter();

  const handleConnexion = async () => {
    const responseToken = await getRequestToken();
    router.push(
      `${process.env.NEXT_PUBLIC_TMDB_AUTHENTICATE}${responseToken.request_token}`,
    );
  };

  return (
    <div className="flex h-[calc(100vh-130px)] w-full flex-col items-center justify-center">
      <p>Ce site utilise la base de données de TMDB,</p>
      <p>
        en cliquant sur le bouton ci-dessous, vous serez redirigé vers le site
        de TMDB afin de vous identifier.
      </p>
      <p>
        Vous devrez également autoriser cette application à accéder à vos
        données.
      </p>
      <Button className="mt-4" variant="bordered" onClick={handleConnexion}>
        Redirection vers TMDB
      </Button>
    </div>
  );
};

export default RedirectionToTmdb;
