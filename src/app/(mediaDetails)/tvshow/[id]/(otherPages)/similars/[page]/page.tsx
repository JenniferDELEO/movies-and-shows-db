import SimilarsWrapper from "@/components/DetailsMedia/Wrappers/SimilarsWrapper";
import { getGenresTvShows, getSimilarsTvShows } from "@/libs/api/tvshows";

type Props = {
  params: { id: string };
};

const Similars = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const { genres: genresTvShows } = await getGenresTvShows();
  const {
    results: similarsTvShows,
    total_pages: totalPagesSimilarsTvShows,
    total_results: totalResultsSimilarsTvShows,
  } = await getSimilarsTvShows(id, 1);

  return (
    <div className="pt-[64px]">
      <SimilarsWrapper
        genresTvShows={genresTvShows}
        mediaId={id}
        similarsTvShows={similarsTvShows}
        totalPagesSimilarsTvShows={totalPagesSimilarsTvShows}
        totalResultsSimilarsTvShows={totalResultsSimilarsTvShows}
      />
    </div>
  );
};

export default Similars;
