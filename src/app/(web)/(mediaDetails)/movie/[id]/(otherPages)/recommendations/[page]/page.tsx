import RecommendationsWrapper from "@/components/DetailsMedia/Wrappers/RecommendationsWrapper";
import { getGenresMovies, getRecommendationsMovie } from "@/libs/api/movies";
import { InternalMovieUser } from "@/models/movies";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/sanity/auth";
import { getAllMovies, getUserMovies } from "@/libs/sanity/api/movie";

type Props = {
  params: { id: string };
};

const Recommendations = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const id = params.id.split("-")[0];

  const { genres: genresMovies } = await getGenresMovies();
  const {
    results: recommendationsMovies,
    total_pages: totalPagesRecommendationsMovies,
    total_results: totalResultsRecommendationsMovies,
  } = await getRecommendationsMovie(id, 1);

  let userMovies: InternalMovieUser[] = [];
  let userMoviesId: string = "";
  if (session) {
    const results = await getUserMovies(session.user.id);
    userMovies = results?.movies || [];
    userMoviesId = results?._id;
  }

  const internalMovies = await getAllMovies();

  return (
    <div>
      <RecommendationsWrapper
        genresMovies={genresMovies}
        mediaId={id}
        recommendationsMovies={recommendationsMovies}
        totalPagesRecommendationsMovies={totalPagesRecommendationsMovies}
        totalResultsRecommendationsMovies={totalResultsRecommendationsMovies}
        userMovies={userMovies}
        userMoviesId={userMoviesId}
        internalMovies={internalMovies}
      />
    </div>
  );
};

export default Recommendations;
