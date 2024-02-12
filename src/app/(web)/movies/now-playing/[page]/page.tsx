import type { Metadata } from "next";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";

import MoviesWrapper from "@/components/ListWrapper/MoviesWrapper";
import {
  getDiscoverMovies,
  getGenresMovies,
  getMoviesProviders,
} from "@/libs/api/movies";
import { defaultMoviesFilters } from "@/libs/helpers/filters";
import { InternalMovieUser } from "@/models/movies";
import { getAllMovies, getUserMovies } from "@/libs/sanity/api/movie";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/sanity/auth";

dayjs.extend(weekdayPlugin);

export const metadata: Metadata = {
  title: "Films au cinéma - Films & Séries TV DB",
};

const NowPlayingMovies = async () => {
  const session = await getServerSession(authOptions);
  const lastMonth = dayjs().subtract(5, "week").day(3).format("YYYY-MM-DD");
  const nextWednesday = dayjs().weekday(7).weekday(3).format("YYYY-MM-DD");

  const nowPlayingFilters = {
    ...defaultMoviesFilters,
    with_release_type: 3,
    "primary_release_date.gte": lastMonth,
    "release_date.lte": nextWednesday,
  };

  const { genres: genresMovies } = await getGenresMovies();
  const {
    results: movies,
    total_pages: totalPagesMovies,
    total_results: totalResultsMovies,
  } = await getDiscoverMovies(nowPlayingFilters);

  const { results: providersMovies } = await getMoviesProviders();

  let userMovies: InternalMovieUser[] = [];
  let userMoviesId: string = "";
  if (session) {
    const results = await getUserMovies(session.user.id);
    userMovies = results?.movies || [];
    userMoviesId = results?._id;
  }

  const internalMovies = await getAllMovies();

  const title = `Films au cinéma (${totalResultsMovies})`;

  return (
    <MoviesWrapper
      genresMovies={genresMovies}
      movies={movies}
      defaultFilters={nowPlayingFilters}
      providersMovies={providersMovies}
      title={title}
      totalPagesMovies={totalPagesMovies}
      userMovies={userMovies}
      userMoviesId={userMoviesId}
      internalMovies={internalMovies}
    />
  );
};

export default NowPlayingMovies;
