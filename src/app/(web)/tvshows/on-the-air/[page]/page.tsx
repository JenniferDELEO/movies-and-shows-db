import type { Metadata } from "next";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";

import TvShowsWrapper from "@/components/ListWrapper/TvShowsWrapper";
import {
  getDiscoverTvShows,
  getGenresTvShows,
  getTvShowsProviders,
} from "@/libs/api/tvShows";
import { defaultTvShowsFilters } from "@/libs/helpers/filters";

dayjs.extend(weekdayPlugin);

export const metadata: Metadata = {
  title: "Séries TV en cours de diffusion - Films & Séries TV DB",
};

const TvShows = async () => {
  const nextWeek = dayjs().add(1, "week").format("YYYY-MM-DD");

  const onTheAirFilters = {
    ...defaultTvShowsFilters,
    "air_date.gte": dayjs().format("YYYY-MM-DD"),
    "air_date.lte": nextWeek,
  };

  const { genres: genresTvShows } = await getGenresTvShows();
  const {
    results: tvShows,
    total_pages: totalPagesTvShows,
    total_results: totalResultsTvShows,
  } = await getDiscoverTvShows(onTheAirFilters);
  const { results: providersTvShows } = await getTvShowsProviders();

  const title = `Séries TV en cours de diffusion (${totalResultsTvShows})`;

  return (
    <TvShowsWrapper
      defaultFilters={onTheAirFilters}
      tvShows={tvShows}
      genresTvShows={genresTvShows}
      providersTvShows={providersTvShows}
      title={title}
      totalPagesTvShows={totalPagesTvShows}
    />
  );
};

export default TvShows;
