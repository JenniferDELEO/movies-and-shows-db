import RecommendationsWrapper from "@/components/DetailsMedia/Wrappers/RecommendationsWrapper";
import { getGenresTvs, getRecommendationsTv } from "@/libs/api/tvs";

type Props = {
  params: { id: string };
};

const Recommendations = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const { genres: genresTvs } = await getGenresTvs();
  const {
    results: recommendationsTvs,
    total_pages: totalPagesRecommendationsTvs,
    total_results: totalResultsRecommendationsTvs,
  } = await getRecommendationsTv(id, 1);

  return (
    <div>
      <RecommendationsWrapper
        genresTvs={genresTvs}
        mediaId={id}
        recommendationsTvs={recommendationsTvs}
        totalPagesRecommendationsTvs={totalPagesRecommendationsTvs}
        totalResultsRecommendationsTvs={totalResultsRecommendationsTvs}
      />
    </div>
  );
};

export default Recommendations;
