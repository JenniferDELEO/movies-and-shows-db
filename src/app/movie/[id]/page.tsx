import MovieWrapper from "@/components/DetailsMedia/Movie/MovieWrapper";
import { getGenresMovies, getMovieDetail } from "@/libs/api/movies";

const Movie = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return <div>Chargement...</div>;

  const data = await getMovieDetail(params.id.split("-")[0]);
  const { genres: genresMovies } = await getGenresMovies();

  return (
    <div className="size-full">
      <MovieWrapper
        movieDetail={data}
        genres={genresMovies}
        movieUrl={params.id}
      />
    </div>
  );
};

export default Movie;
