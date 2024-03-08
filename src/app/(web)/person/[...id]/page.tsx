import type { Metadata } from "next";

import BannerWrapper from "@/components/Banner/BannerWrapper";
import Infos from "@/components/People/PeopleDetails/Infos";
import { getPeopleDetail } from "@/libs/api/people";
import { InternalMovieUser, Movie } from "@/models/movies";
import { InternalTvAndUser, Tv } from "@/models/tvs";
import { getAllMovies, getUserMovies } from "@/libs/sanity/api/movie";
import { getAllTvs, getUserTvs } from "@/libs/sanity/api/tv";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/sanity/auth";

type Props = {
  params: { id: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id[0];

  const peopleDetail = await getPeopleDetail(id);

  return {
    title: `${peopleDetail.name} - Films & Séries TV DB`,
  };
}

const Person = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const id = params.id[0];

  const peopleDetail = await getPeopleDetail(id);

  const actingMovies: Movie[] = peopleDetail?.movie_credits?.cast;
  const runningMovies: Movie[] = peopleDetail?.movie_credits?.crew;
  const actingTvs: Tv[] = peopleDetail?.tv_credits?.cast;
  const runningTvs: Tv[] = peopleDetail?.tv_credits?.crew;

  let userMovies: InternalMovieUser[] = [];
  let userMoviesId: string = "";
  let userTvs: InternalTvAndUser[] = [];

  if (session) {
    const responseUserMovies = await getUserMovies(session.user.id);
    userMovies = responseUserMovies?.movies || [];
    userMoviesId = responseUserMovies?._id;
    userTvs = await getUserTvs(session.user.id);
  }

  const internalMovies = await getAllMovies();
  const internalTvs = await getAllTvs();

  return (
    <div className="mx-auto w-full md:w-[95%] lg:w-[90%]">
      <Infos data={peopleDetail} />
      <BannerWrapper
        personDetailProps={{
          actingMovies,
          runningMovies,
          actingTvs,
          runningTvs,
          userMovies,
          userMoviesId,
          internalMovies,
          userTvs,
          internalTvs,
        }}
      />
    </div>
  );
};

export default Person;
