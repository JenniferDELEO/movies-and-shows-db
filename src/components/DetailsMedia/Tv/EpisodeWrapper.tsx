import {
  EpisodeDetails,
  InternalTvAndUser,
  SeasonDetails,
  TvDetails,
} from "@/models/tvs";
import { FC } from "react";
import TopContent from "../TopContent";
import SeasonsAndEpisodesWrapper from "./SeasonsAndEpisodesWrapper";
import PeopleCard from "@/components/People/PeopleCard";
import SimilarsBanner from "../Banners/SimilarsBanner";
import RecommendationsBanner from "../Banners/RecommendationsBanner";

type Props = {
  episodeDetails: EpisodeDetails;
  episodeNumber: number;
  seasonDetails: SeasonDetails;
  seasonNumber: number;
  seasonPrecedentDetails: SeasonDetails | undefined;
  tvDetails: TvDetails;
  tvId: number;
  userTvs: InternalTvAndUser[];
};

const EpisodeWrapper: FC<Props> = (props) => {
  const {
    episodeDetails,
    episodeNumber,
    seasonDetails,
    seasonNumber,
    seasonPrecedentDetails,
    tvDetails,
    tvId,
    userTvs,
  } = props;

  let episodePrecedent = seasonDetails?.episodes.filter((episode) => {
    if (seasonNumber === 1 && episodeNumber > 1)
      return episode.episode_number === episodeNumber - 1;
    if (seasonNumber > 1 && episodeNumber > 1)
      return (
        episode.season_number === seasonNumber &&
        episode.episode_number === episodeNumber - 1
      );
  })[0];

  if (seasonNumber > 1 && episodeNumber === 1 && seasonPrecedentDetails) {
    episodePrecedent =
      seasonPrecedentDetails?.episodes[
        seasonPrecedentDetails?.episodes?.length - 1
      ];
  }

  const selectedSeasonDefault = tvDetails?.seasons.filter(
    (season) => season.season_number === seasonNumber,
  )[0];

  return (
    <div className="size-full">
      <TopContent
        episodeDetails={episodeDetails}
        tvDetails={tvDetails}
        episodeNumber={episodeNumber}
        episodePrecedent={episodePrecedent}
        seasonNumber={seasonNumber}
        type="episode"
        tvId={tvId}
      />
      {tvDetails?.seasons?.length > 0 && (
        <SeasonsAndEpisodesWrapper
          seasons={tvDetails.seasons.filter(
            (season) => season.season_number !== 0,
          )}
          tvId={tvId}
          isEpisodePage={true}
          selectedSeasonDefault={selectedSeasonDefault}
          userTvs={userTvs}
        />
      )}
      {episodeDetails?.credits?.cast.length > 0 && (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <h1 className="mx-auto py-4 text-xl font-bold md:w-[90%]">
            Acteurs principaux de l&apos;épisode
          </h1>
          <div className="mx-auto flex flex-row items-center overflow-x-auto md:w-[90%]">
            {episodeDetails.credits.cast.map((person) => (
              <div
                key={person.id}
                className="mx-2 my-4 max-h-[350px] min-w-[150px]"
              >
                <PeopleCard itemCastTv={person} />
              </div>
            ))}
          </div>
        </section>
      )}
      {tvDetails?.recommendations?.results?.length > 0 ? (
        <RecommendationsBanner
          recommendationsTvs={tvDetails.recommendations.results}
          totalPages={tvDetails.recommendations.total_pages}
          totalResults={tvDetails.recommendations.total_results}
        />
      ) : (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <h1 className="pl-5 text-xl font-bold tracking-wide">
            Recommandations
          </h1>
          <p className="mb-4 py-4 pl-5 text-base md:text-lg">
            Nous n&apos;avons pas suffisamment de données pour vous suggérer des
            films. Vous pouvez nous y aider en notant les films que vous avez
            vus.
          </p>
        </section>
      )}
      {tvDetails?.similar?.results?.length > 0 && (
        <SimilarsBanner
          similarsTvs={tvDetails.similar.results}
          totalPages={tvDetails.similar.total_pages}
          totalResults={tvDetails.similar.total_results}
        />
      )}
    </div>
  );
};

export default EpisodeWrapper;
