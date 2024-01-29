import RecommendationsWrapper from "@/components/DetailsMedia/Wrappers/RecommendationsWrapper";
import { getGenresTvShows, getRecommendationsTvShow } from "@/libs/api/tvshows";

type Props = {
  params: { id: string };
};

const Recommendations = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const { genres: genresTvShows } = await getGenresTvShows();
  const {
    results: recommendationsTvShows,
    total_pages: totalPagesRecommendationsTvShows,
    total_results: totalResultsRecommendationsTvShows,
  } = await getRecommendationsTvShow(id, 1);

  return (
    <div className="pt-[64px]">
      <RecommendationsWrapper
        genresTvShows={genresTvShows}
        mediaId={id}
        recommendationsTvShows={recommendationsTvShows}
        totalPagesRecommendationsTvShows={totalPagesRecommendationsTvShows}
        totalResultsRecommendationsTvShows={totalResultsRecommendationsTvShows}
      />
    </div>
  );
};

export default Recommendations;
