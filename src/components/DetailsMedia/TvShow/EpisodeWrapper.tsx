import { EpisodeDetails, SeasonDetails, TvShowDetails } from "@/models/tvShows";
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
  tvShowDetails: TvShowDetails;
  tvShowId: number;
};

const EpisodeWrapper: FC<Props> = (props) => {
  const {
    episodeDetails,
    episodeNumber,
    seasonDetails,
    seasonNumber,
    seasonPrecedentDetails,
    tvShowDetails,
    tvShowId,
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

  const selectedSeasonDefault = tvShowDetails?.seasons.filter(
    (season) => season.season_number === seasonNumber,
  )[0];

  return (
    <div className="size-full">
      <TopContent
        episodeDetails={episodeDetails}
        tvShowDetails={tvShowDetails}
        episodeNumber={episodeNumber}
        episodePrecedent={episodePrecedent}
        seasonNumber={seasonNumber}
        type="episode"
        tvShowId={tvShowId}
      />
      {tvShowDetails?.seasons?.length > 0 && (
        <SeasonsAndEpisodesWrapper
          seasons={tvShowDetails.seasons.filter(
            (season) => season.season_number !== 0,
          )}
          tvShowId={tvShowId}
          isEpisodePage={true}
          selectedSeasonDefault={selectedSeasonDefault}
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
                <PeopleCard itemCastTvShow={person} />
              </div>
            ))}
          </div>
        </section>
      )}
      {tvShowDetails?.recommendations?.results?.length > 0 ? (
        <RecommendationsBanner
          recommendationsTvShows={tvShowDetails.recommendations.results}
          totalPages={tvShowDetails.recommendations.total_pages}
          totalResults={tvShowDetails.recommendations.total_results}
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
      {tvShowDetails?.similar?.results?.length > 0 && (
        <SimilarsBanner
          similarsTvShows={tvShowDetails.similar.results}
          totalPages={tvShowDetails.similar.total_pages}
          totalResults={tvShowDetails.similar.total_results}
        />
      )}
    </div>
  );
};

export default EpisodeWrapper;
