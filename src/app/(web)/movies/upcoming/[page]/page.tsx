import type { Metadata } from "next";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";

import MoviesWrapper from "@/components/ListWrapper/MoviesWrapper";
import { getDiscoverMovies, getGenresMovies, getMoviesProviders } from "@/libs/api/movies";
import { defaultMoviesFilters } from "@/libs/helpers/filters";

dayjs.extend(weekdayPlugin);

export const metadata: Metadata = {
  title: "Films à venir - Films & Séries TV DB"
};

const UpComingMovies = async () => {
  const nextWednesday = dayjs().weekday(7).weekday(3).format("YYYY-MM-DD");
  const nextMonthWednesday = dayjs().add(4, "week").day(3).format("YYYY-MM-DD");

  const upComingFilters = {
    ...defaultMoviesFilters,
    "primary_release_date.gte": nextWednesday,
    "release_date.lte": nextMonthWednesday
  };

  const { genres: genresMovies } = await getGenresMovies();
  const {
    results: movies,
    total_pages: totalPagesMovies,
    total_results: totalResultsMovies
  } = await getDiscoverMovies(upComingFilters);

  const { results: providersMovies } = await getMoviesProviders();

  const title = `Films à venir (${totalResultsMovies})`;

  return (
    <MoviesWrapper
      genresMovies={genresMovies}
      movies={movies}
      defaultFilters={upComingFilters}
      providersMovies={providersMovies}
      title={title}
      totalPagesMovies={totalPagesMovies}
    />
  );
};

export default UpComingMovies;
