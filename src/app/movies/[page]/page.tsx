import MoviesWrapper from "@/components/ListWrapper/MoviesWrapper";
import {
  getDiscoverMovies,
  getGenresMovies,
  getMoviesProviders,
} from "@/libs/api/movies";

const Movies = async () => {
  const { genres: genresMovies } = await getGenresMovies();
  const {
    results: movies,
    total_pages: totalPagesMovies,
    total_results: totalResultsMovies,
  } = await getDiscoverMovies();
  const { results: providersMovies } = await getMoviesProviders();

  return (
    <MoviesWrapper
      movies={movies}
      genresMovies={genresMovies}
      providersMovies={providersMovies}
      totalPagesMovies={totalPagesMovies}
      totalResultsMovies={totalResultsMovies}
    />
  );
};

export default Movies;
