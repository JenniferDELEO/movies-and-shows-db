import SimilarsWrapper from "@/components/DetailsMedia/Wrappers/SimilarsWrapper";
import { getGenresMovies, getSimilarsMovie } from "@/libs/api/movies";

type Props = {
  params: { id: string };
};

const Similars = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const { genres: genresMovies } = await getGenresMovies();
  const {
    results: similarsMovies,
    total_pages: totalPagesSimilarsMovies,
    total_results: totalResultsSimilarsMovies,
  } = await getSimilarsMovie(id, 1);

  return (
    <div>
      <SimilarsWrapper
        genresMovies={genresMovies}
        mediaId={id}
        similarsMovies={similarsMovies}
        totalPagesSimilarsMovies={totalPagesSimilarsMovies}
        totalResultsSimilarsMovies={totalResultsSimilarsMovies}
      />
    </div>
  );
};

export default Similars;
