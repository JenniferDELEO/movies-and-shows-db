import SimilarsWrapper from "@/components/DetailsMedia/Wrappers/SimilarsWrapper";
import { getGenresTvs, getSimilarsTv } from "@/libs/api/tvs";

type Props = {
  params: { id: string };
};

const Similars = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const { genres: genresTvs } = await getGenresTvs();
  const {
    results: similarsTvs,
    total_pages: totalPagesSimilarsTvs,
    total_results: totalResultsSimilarsTvs,
  } = await getSimilarsTv(id, 1);

  return (
    <div>
      <SimilarsWrapper
        genresTvs={genresTvs}
        mediaId={id}
        similarsTvs={similarsTvs}
        totalPagesSimilarsTvs={totalPagesSimilarsTvs}
        totalResultsSimilarsTvs={totalResultsSimilarsTvs}
      />
    </div>
  );
};

export default Similars;
