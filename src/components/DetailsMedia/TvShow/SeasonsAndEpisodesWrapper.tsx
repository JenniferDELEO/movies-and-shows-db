/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FC, useEffect, useState } from "react";

import { Season, SeasonDetails } from "@/models/tvShows";
import SeasonsBanner from "@/components/DetailsMedia/TvShow/SeasonsBanner";
import EpisodesBanner from "@/components/DetailsMedia/TvShow/EpisodesBanner";
import { getSeasonDetails } from "@/libs/api/tvShows";

type Props = {
  seasons: Season[];
  tvShowId: number;
  isEpisodePage?: boolean;
  selectedSeasonDefault?: Season;
};

const SeasonsAndEpisodesWrapper: FC<Props> = (props) => {
  const { seasons, tvShowId, isEpisodePage, selectedSeasonDefault } = props;
  const [selectedSeason, setSelectedSeason] = useState<Season>(
    selectedSeasonDefault ||
      seasons.filter((season) => season.season_number === 1)[0],
  );
  const [seasonDetails, setSeasonDetails] = useState<SeasonDetails | null>(
    null,
  );

  async function fetchSeasonDetails() {
    const response = await getSeasonDetails(
      tvShowId,
      selectedSeason.season_number,
    );
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
          <EpisodesBanner seasonDetails={seasonDetails} />
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
