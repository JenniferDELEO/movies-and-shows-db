import type { Metadata } from "next";

import TvsWrapper from "@/components/ListWrapper/TvsWrapper";
import { getDiscoverTvs, getGenresTvs, getTvsProviders } from "@/libs/api/tvs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/sanity/auth";
import { InternalTvAndUser } from "@/models/tvs";
import { getAllTvs, getUserTvs } from "@/libs/sanity/api/tv";
import { Suspense } from "react";
import LoadingSpinner from "../../loading";

export const metadata: Metadata = {
  title: "Séries TV - Films & Séries TV DB",
};

const Tvs = async () => {
  const session = await getServerSession(authOptions);
  const { genres: genresTvs } = await getGenresTvs();
  const {
    results: tvs,
    total_pages: totalPagesTvs,
    total_results: totalResultsTvs,
  } = await getDiscoverTvs();
  const { results: providersTvs } = await getTvsProviders();

  let userTvs: InternalTvAndUser[] = [];

  if (session) {
    userTvs = await getUserTvs(session.user.id);
  }

  const internalTvs = await getAllTvs();

  const title = `Liste des Séries TV (${totalResultsTvs})`;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TvsWrapper
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
