"use client";

import { UserContext } from "@/context/userContext";
import {
  getAccountDetails,
  getRequestToken,
  getUserSessionId,
} from "@/libs/apis";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [requestToken, setRequestToken] = useState<string | null>(null);

  const {
    user: { username, accountId, sessionId },
    setUser,
  } = useContext(UserContext);

  const handleConnexion = async () => {
    const responseToken = await getRequestToken();
    router.push(
      `https://www.themoviedb.org/authenticate/${responseToken.request_token}?redirect_to=http://localhost:3000/`
    );
  };

  useEffect(() => {
    setRequestToken(localStorage.getItem("request_token"));

    async function getUserAccount() {
      if (!requestToken) return;
      const responseJsonSession = await getUserSessionId(requestToken);

      await getAccountDetails(responseJsonSession.session_id);
      window.location.reload();
    }
    if (requestToken && !username && !accountId && !sessionId) {
      getUserAccount();
    }
  }, [accountId, requestToken, router, sessionId, setUser, username]);

  return (
    <header className="p-10 w-[80%] mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between border-b-2 border-b-white mb-10">
      <div className="flex items-center w-full md:w-2/3">
        <Link href="/">Accueil</Link>
      </div>
      <ul className="flex items-center justify-between w-full md:w-1/3 mt-4">
        <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/movies">Films</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/tvshows">Séries TV</Link>
        </li>
        {!username && !accountId && !sessionId ? (
          <li className="hover:-translate-y-2 duration-500 transition-all cursor-pointer">
            <div onClick={handleConnexion}>Connexion/Inscription</div>
          </li>
        ) : (
          <li className="hover:-translate-y-2 duration-500 transition-all">
            <Link href="/profil">Mon Profil</Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
