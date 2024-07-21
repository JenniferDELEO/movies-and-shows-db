import type { Metadata } from "next";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";

import MoviesWrapper from "@/components/ListWrapper/MoviesWrapper";
import { getDiscoverMovies, getGenresMovies, getMoviesProviders } from "@/libs/api/movies";
import { defaultMoviesFilters } from "@/libs/helpers/filters";

dayjs.extend(weekdayPlugin);

export const metadata: Metadata = {
  title: "Films au cinéma - Films & Séries TV DB"
};

const NowPlayingMovies = async () => {
  const lastMonth = dayjs().subtract(5, "week").day(3).format("YYYY-MM-DD");
  const nextWednesday = dayjs().weekday(7).weekday(3).format("YYYY-MM-DD");

  const nowPlayingFilters = {
    ...defaultMoviesFilters,
    with_release_type: 3,
    "primary_release_date.gte": lastMonth,
    "release_date.lte": nextWednesday
  };

  const { genres: genresMovies } = await getGenresMovies();
  const {
    results: movies,
    total_pages: totalPagesMovies,
    total_results: totalResultsMovies
  } = await getDiscoverMovies(nowPlayingFilters);

  const { results: providersMovies } = await getMoviesProviders();

  const title = `Films au cinéma (${totalResultsMovies})`;

  return (
    <MoviesWrapper
      genresMovies={genresMovies}
      movies={movies}
      defaultFilters={nowPlayingFilters}
      providersMovies={providersMovies}
      title={title}
      totalPagesMovies={totalPagesMovies}
    />
  );
};

export default NowPlayingMovies;
