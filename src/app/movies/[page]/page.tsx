import MoviesWrapper from "@/components/ListWrapper/MoviesWrapper";
import {
  getGenresMovies,
  getMoviesProviders,
  getPopularMovies,
} from "@/libs/api/movies";

const Movies = async () => {
  const { genres: genresMovies } = await getGenresMovies();
  const {
    results: popularMovies,
    total_pages: totalPagesPopularMovies,
    total_results: totalResultsPopularMovies,
  } = await getPopularMovies(1);
  const { results: providersMovies } = await getMoviesProviders();

  return (
    <MoviesWrapper
      popularMovies={popularMovies}
      genresMovies={genresMovies}
      providersMovies={providersMovies}
      totalPagesPopularMovies={totalPagesPopularMovies}
      totalResultsPopularMovies={totalResultsPopularMovies}
    />
  );
};

export default Movies;
