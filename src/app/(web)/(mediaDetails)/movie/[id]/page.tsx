import { getMovieDetail } from "@/libs/api/movies";
import MovieWrapper from "@/components/DetailsMedia/Movie/MovieWrapper";
import { InternalMovieUser } from "@/models/movies";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/sanity/auth";
import { getAllMovies, getUserMovies } from "@/libs/sanity/api/movie";

type Props = {
  params: { id: string };
};

const Movie = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const id = params.id.split("-")[0];

  const movieDetails = await getMovieDetail(id);

  let userMovies: InternalMovieUser[] = [];
  let userMoviesId: string = "";
  if (session) {
    const results = await getUserMovies(session.user.id);
    userMovies = results?.movies || [];
    userMoviesId = results?._id;
  }

  const internalMovies = await getAllMovies();

  return (
    <div className="size-full">
      <MovieWrapper
        movieDetails={movieDetails}
        movieUrl={params.id}
        userMovies={userMovies}
        userMoviesId={userMoviesId}
        internalMovies={internalMovies}
      />
    </div>
  );
};

export default Movie;
