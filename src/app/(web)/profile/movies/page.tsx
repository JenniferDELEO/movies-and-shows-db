"use client";

/* import type { Metadata } from "next"; */
import { useSession } from "next-auth/react";

import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import { getUserMovies } from "@/libs/sanity/api/movie";
import { useEffect, useState } from "react";
import { InternalMovieResponse } from "@/models/movies";

/* export const metadata: Metadata = {
  title: "Mes films - Films & Séries TV DB",
}; */

const ProfileMovies = () => {
  const { data: session } = useSession();
  console.log(session);
  const [moviesList, setMoviesList] = useState<InternalMovieResponse[]>([]);

  const fetchMovies = async () => {
    if (session) {
      const results = await getUserMovies(session?.user.id);
      setMoviesList(results?.movies);
    }
  };

  useEffect(() => {
    if (session) fetchMovies();
  }, [session]);

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
