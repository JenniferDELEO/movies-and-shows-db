import type { Metadata } from "next";

import MoviesWrapper from "@/components/ListWrapper/MoviesWrapper";
import {
  getDiscoverMovies,
  getGenresMovies,
  getMoviesProviders,
} from "@/libs/api/movies";

export const metadata: Metadata = {
  title: "Films - Films & Séries TV DB",
};

const Movies = async () => {
  const { genres: genresMovies } = await getGenresMovies();
  const {
    results: movies,
    total_pages: totalPagesMovies,
    total_results: totalResultsMovies,
  } = await getDiscoverMovies();
  const { results: providersMovies } = await getMoviesProviders();

  const title = `Liste des films (${totalResultsMovies})`;

  return (
    <MoviesWrapper
      genresMovies={genresMovies}
      movies={movies}
      providersMovies={providersMovies}
      title={title}
      totalPagesMovies={totalPagesMovies}
      totalResultsMovies={totalResultsMovies}
    />
  );
};

export default Movies;
