import SimilarsWrapper from "@/components/DetailsMedia/Wrappers/SimilarsWrapper";
import { getGenresMovies, getSimilarsMovie } from "@/libs/api/movies";
import { InternalMovieUser } from "@/models/movies";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/sanity/auth";
import { getAllMovies, getUserMovies } from "@/libs/sanity/api/movie";
import { Suspense } from "react";
import LoadingSpinner from "@/app/(web)/loading";

type Props = {
  params: { id: string };
};

const Similars = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const id = params.id.split("-")[0];

  const { genres: genresMovies } = await getGenresMovies();
  const {
    results: similarsMovies,
    total_pages: totalPagesSimilarsMovies,
    total_results: totalResultsSimilarsMovies,
  } = await getSimilarsMovie(id, 1);

  let userMovies: InternalMovieUser[] = [];
  let userMoviesId: string = "";
  if (session) {
    const results = await getUserMovies(session.user.id);
    userMovies = results?.movies || [];
    userMoviesId = results?._id;
  }

  const internalMovies = await getAllMovies();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SimilarsWrapper
        genresMovies={genresMovies}
        mediaId={id}
        similarsMovies={similarsMovies}
        totalPagesSimilarsMovies={totalPagesSimilarsMovies}
        totalResultsSimilarsMovies={totalResultsSimilarsMovies}
        userMovies={userMovies}
        userMoviesId={userMoviesId}
        internalMovies={internalMovies}
      />
    </Suspense>
  );
};

export default Similars;
