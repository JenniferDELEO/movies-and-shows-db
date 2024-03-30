import type { Metadata } from "next";

import MoviesWrapper from "@/components/ListWrapper/MoviesWrapper";
import {
  getDiscoverMovies,
  getGenresMovies,
  getMoviesProviders,
} from "@/libs/api/movies";
import { InternalMovieUser } from "@/models/movies";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/sanity/auth";
import { getAllMovies, getUserMovies } from "@/libs/sanity/api/movie";
import { Suspense } from "react";
import LoadingSpinner from "../../loading";

export const metadata: Metadata = {
  title: "Films - Films & Séries TV DB",
};

const Movies = async () => {
  const session = await getServerSession(authOptions);
  const { genres: genresMovies } = await getGenresMovies();
  const {
    results: movies,
    total_pages: totalPagesMovies,
    total_results: totalResultsMovies,
  } = await getDiscoverMovies();
  const { results: providersMovies } = await getMoviesProviders();

  let userMovies: InternalMovieUser[] = [];
  let userMoviesId: string = "";
  if (session) {
    const results = await getUserMovies(session.user.id);
    userMovies = results?.movies || [];
    userMoviesId = results?._id;
  }

  const internalMovies = await getAllMovies();

  const title = `Liste des films (${totalResultsMovies})`;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MoviesWrapper
        genresMovies={genresMovies}
        movies={movies}
        providersMovies={providersMovies}
        title={title}
        totalPagesMovies={totalPagesMovies}
        userMovies={userMovies}
        userMoviesId={userMoviesId}
        internalMovies={internalMovies}
      />
    </Suspense>
  );
};

export default Movies;
