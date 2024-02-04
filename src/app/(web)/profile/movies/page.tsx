"use client";

/* import type { Metadata } from "next"; */
import { useSession } from "next-auth/react";
import useSWR from "swr";

import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import axios from "axios";

/* export const metadata: Metadata = {
  title: "Mes films - Films & Séries TV DB",
}; */

const ProfileMovies = () => {
  const { data: session } = useSession();

  const fetchMovies = async () => {
    const { data } = await axios.get<any>("/api/movies");
    return data;
  };

  const { data, error, isLoading } = useSWR("/api/movies", fetchMovies);

  console.log(data);

  if (!session) {
    return <div>Vous devez être authentifé pour accéder à cette page</div>;
  }

  return (
    <div>
      <WorkInProgress />
    </div>
  );
};

export default ProfileMovies;
