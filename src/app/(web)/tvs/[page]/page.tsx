import type { Metadata } from "next";

import TvsWrapper from "@/components/ListWrapper/TvsWrapper";
import { getDiscoverTvs, getGenresTvs, getTvsProviders } from "@/libs/api/tvs";

export const metadata: Metadata = {
  title: "Séries TV - Films & Séries TV DB",
};

const Tvs = async () => {
  const { genres: genresTvs } = await getGenresTvs();
  const {
    results: tvs,
    total_pages: totalPagesTvs,
    total_results: totalResultsTvs,
  } = await getDiscoverTvs();
  const { results: providersTvs } = await getTvsProviders();

  const title = `Liste des Séries TV (${totalResultsTvs})`;

  return (
    <TvsWrapper
      tvs={tvs}
      genresTvs={genresTvs}
      providersTvs={providersTvs}
      title={title}
      totalPagesTvs={totalPagesTvs}
    />
  );
};

export default Tvs;
