"use client";

/* import type { Metadata } from "next"; */
import { useSession } from "next-auth/react";

import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import { getAllMovies, getUserMovies } from "@/libs/sanity/api/movie";
import { useEffect, useState } from "react";
import { InternalMovie, InternalMovieUser } from "@/models/movies";

/* export const metadata: Metadata = {
  title: "Mes films - Films & Séries TV DB",
}; */

const ProfileMovies = () => {
  const { data: session } = useSession();

  const [moviesList, setMoviesList] = useState<InternalMovie[]>([]);
  const [moviesUserList, setMoviesUserList] = useState<InternalMovieUser[]>([]);

  const fetchAllMovies = async () => {
    const results = await getAllMovies();
    setMoviesList(results);
  };

  const fetchUserMovies = async () => {
    if (session) {
      const results = await getUserMovies(session?.user.id);
      setMoviesUserList(results?.movies);
    }
  };

  useEffect(() => {
    fetchAllMovies();

    if (session) fetchUserMovies();
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
