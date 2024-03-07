/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FC, useEffect, useState } from "react";

import { InternalTvAndUser, Season, SeasonDetails } from "@/models/tvs";
import SeasonsBanner from "@/components/DetailsMedia/Tv/SeasonsBanner";
import EpisodesBanner from "@/components/DetailsMedia/Tv/EpisodesBanner";
import { getSeasonDetails } from "@/libs/api/tvs";
import { useSession } from "next-auth/react";
import { getUserSeasonsByTv } from "@/libs/sanity/api/tv-season";

type Props = {
  seasons: Season[];
  tvId: number;
  isEpisodePage?: boolean;
  selectedSeasonDefault?: Season;
  userTvs: InternalTvAndUser[];
};

const SeasonsAndEpisodesWrapper: FC<Props> = (props) => {
  const { seasons, tvId, isEpisodePage, selectedSeasonDefault, userTvs } =
    props;
  const session = useSession();
  const [selectedSeason, setSelectedSeason] = useState<Season>(
    selectedSeasonDefault ||
      seasons.filter((season) => season.season_number === 1)[0],
  );
  const [seasonDetails, setSeasonDetails] = useState<SeasonDetails | null>(
    null,
  );

  const userHasTv = userTvs.find(
    (userTv) => userTv.tv.tmdb_id === seasonDetails?.episodes[0].show_id,
  );

  async function fetchUserSeasonsByTv() {
    if (userHasTv && session && session?.data?.user) {
      const result = await getUserSeasonsByTv(
        userHasTv.tv._id,
        session.data.user.id,
      );
    }
  }

  useEffect(() => {
    if (userHasTv) {
      fetchUserSeasonsByTv();
    }
  }, [userHasTv, seasonDetails]);

  async function fetchSeasonDetails() {
    const response = await getSeasonDetails(tvId, selectedSeason.season_number);
    setSeasonDetails(response);
  }

  useEffect(() => {
    fetchSeasonDetails();
  }, [selectedSeason]);

  const SeasonBanner = () => {
    return (
      <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
        <SeasonsBanner
          seasons={seasons}
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
        />
        <div className="mx-auto mb-0 mt-16 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
      </section>
    );
  };

  const EpisodeBanner = () => {
    return (
      seasonDetails && (
        <section
          className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]"
          id="episode-section"
        >
          <EpisodesBanner seasonDetails={seasonDetails} userTvs={userTvs} />
          <div className="mx-auto mb-0 mt-16 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      )
    );
  };

  return isEpisodePage ? (
    <>
      <EpisodeBanner />
      <SeasonBanner />
    </>
  ) : (
    <>
      <SeasonBanner />
      <EpisodeBanner />
    </>
  );
};

export default SeasonsAndEpisodesWrapper;
