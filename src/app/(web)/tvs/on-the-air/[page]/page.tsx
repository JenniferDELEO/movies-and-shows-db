import type { Metadata } from "next";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";

import TvsWrapper from "@/components/ListWrapper/TvsWrapper";
import { getDiscoverTvs, getGenresTvs, getTvsProviders } from "@/libs/api/tvs";
import { defaultTvsFilters } from "@/libs/helpers/filters";
import { InternalTvAndUser } from "@/models/tvs";
import { getAllTvs, getUserTvs } from "@/libs/sanity/api/tv";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/sanity/auth";
import { Suspense } from "react";
import LoadingSpinner from "@/app/(web)/loading";

dayjs.extend(weekdayPlugin);

export const metadata: Metadata = {
  title: "Séries TV en cours de diffusion - Films & Séries TV DB",
};

const Tvs = async () => {
  const session = await getServerSession(authOptions);

  const nextWeek = dayjs().add(1, "week").format("YYYY-MM-DD");

  const onTheAirFilters = {
    ...defaultTvsFilters,
    "air_date.gte": dayjs().format("YYYY-MM-DD"),
    "air_date.lte": nextWeek,
  };

  const { genres: genresTvs } = await getGenresTvs();
  const {
    results: tvs,
    total_pages: totalPagesTvs,
    total_results: totalResultsTvs,
  } = await getDiscoverTvs(onTheAirFilters);
  const { results: providersTvs } = await getTvsProviders();

  let userTvs: InternalTvAndUser[] = [];

  if (session) {
    userTvs = await getUserTvs(session.user.id);
  }

  const internalTvs = await getAllTvs();

  const title = `Séries TV en cours de diffusion (${totalResultsTvs})`;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TvsWrapper
        defaultFilters={onTheAirFilters}
        tvs={tvs}
        genresTvs={genresTvs}
        providersTvs={providersTvs}
        title={title}
        totalPagesTvs={totalPagesTvs}
        userTvs={userTvs}
        internalTvs={internalTvs}
      />
    </Suspense>
  );
};

export default Tvs;
