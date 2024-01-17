import MoviesWrapper from "@/components/ListWrapper/MoviesWrapper";
import {
  getGenresMovies,
  getMoviesProviders,
  getPopularMovies,
} from "@/libs/api/movies";

const Movies = async () => {
  const { genres: genresMovies } = await getGenresMovies();
  const { results: popularMovies } = await getPopularMovies();
  const { results: providersMovies } = await getMoviesProviders();

  return (
    <MoviesWrapper
      popularMovies={popularMovies}
      genresMovies={genresMovies}
      providersMovies={providersMovies}
    />
  );
};

export default Movies;
