import type { Metadata } from "next";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";

import TvsWrapper from "@/components/ListWrapper/TvsWrapper";
import { getDiscoverTvs, getGenresTvs, getTvsProviders } from "@/libs/api/tvs";
import { defaultTvsFilters } from "@/libs/helpers/filters";

dayjs.extend(weekdayPlugin);

export const metadata: Metadata = {
  title: "Séries TV en cours de diffusion - Films & Séries TV DB"
};

const Tvs = async () => {
  const nextWeek = dayjs().add(1, "week").format("YYYY-MM-DD");

  const onTheAirFilters = {
    ...defaultTvsFilters,
    "air_date.gte": dayjs().format("YYYY-MM-DD"),
    "air_date.lte": nextWeek
  };

  const { genres: genresTvs } = await getGenresTvs();
  const {
    results: tvs,
    total_pages: totalPagesTvs,
    total_results: totalResultsTvs
  } = await getDiscoverTvs(onTheAirFilters);
  const { results: providersTvs } = await getTvsProviders();

  const title = `Séries TV en cours de diffusion (${totalResultsTvs})`;

  return (
    <TvsWrapper
      defaultFilters={onTheAirFilters}
      tvs={tvs}
      genresTvs={genresTvs}
      providersTvs={providersTvs}
      title={title}
      totalPagesTvs={totalPagesTvs}
    />
  );
};

export default Tvs;
