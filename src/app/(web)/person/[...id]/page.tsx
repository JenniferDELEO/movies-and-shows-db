import type { Metadata } from "next";

import BannerWrapper from "@/components/Banner/BannerWrapper";
import Infos from "@/components/People/PeopleDetails/Infos";
import { getPeopleDetail } from "@/libs/api/people";
import { InternalMovieUser, Movie } from "@/models/movies";
import { InternalTvShowAndUser, TvShow } from "@/models/tvShows";
import { getAllMovies, getUserMovies } from "@/libs/sanity/api/movie";
import { getAllTvShows, getUserTvShows } from "@/libs/sanity/api/tvShow";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/sanity/auth";
import { getGenresMovies } from "@/libs/api/movies";
import { getGenresTvShows } from "@/libs/api/tvShows";

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
  const actingTvShows: TvShow[] = peopleDetail?.tv_credits?.cast;
  const runningTvShows: TvShow[] = peopleDetail?.tv_credits?.crew;

  let userMovies: InternalMovieUser[] = [];
  let userMoviesId: string = "";
  if (session) {
    const results = await getUserMovies(session.user.id);
    userMovies = results?.movies || [];
    userMoviesId = results?._id;
  }

  let userTvShows: InternalTvShowAndUser[] = [];
  let userTvShowsId: string = "";
  if (session) {
    const results = await getUserTvShows(session.user.id);
    userTvShows = results?.tv_shows || [];
    userTvShowsId = results?._id;
  }

  const { genres: genresMovies } = await getGenresMovies();
  const { genres: genresTvShows } = await getGenresTvShows();

  const internalMovies = await getAllMovies();
  const internalTvShows = await getAllTvShows();

  return (
    <div className="mx-auto w-full md:w-[95%] lg:w-[90%]">
      <Infos data={peopleDetail} />
      <BannerWrapper
        personDetailProps={{
          actingMovies,
          runningMovies,
          actingTvShows,
          runningTvShows,
          genresMovies,
          userMovies,
          userMoviesId,
          internalMovies,
          genresTvShows,
          userTvShows,
          userTvShowsId,
          internalTvShows,
        }}
      />
    </div>
  );
};

export default Person;
