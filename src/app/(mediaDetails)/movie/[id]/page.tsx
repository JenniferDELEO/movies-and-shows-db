import { getMovieDetail } from "@/libs/api/movies";
import MovieWrapper from "@/components/DetailsMedia/Movie/MovieWrapper";

type Props = {
  params: { id: string };
};

const Movie = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const movieDetail = await getMovieDetail(id);

  return (
    <div className="size-full">
      <MovieWrapper movieDetail={movieDetail} movieUrl={params.id} />
    </div>
  );
};

export default Movie;
