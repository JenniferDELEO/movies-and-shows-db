import RecommendationsWrapper from "@/components/DetailsMedia/Wrappers/RecommendationsWrapper";
import { getGenresMovies, getRecommendationsMovie } from "@/libs/api/movies";

type Props = {
  params: { id: string };
};

const Recommendations = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const { genres: genresMovies } = await getGenresMovies();
  const {
    results: recommendationsMovies,
    total_pages: totalPagesRecommendationsMovies,
    total_results: totalResultsRecommendationsMovies,
  } = await getRecommendationsMovie(id, 1);

  return (
    <div>
      <RecommendationsWrapper
        genresMovies={genresMovies}
        mediaId={id}
        recommendationsMovies={recommendationsMovies}
        totalPagesRecommendationsMovies={totalPagesRecommendationsMovies}
        totalResultsRecommendationsMovies={totalResultsRecommendationsMovies}
      />
    </div>
  );
};

export default Recommendations;
