import { FC } from "react";

import TopContent from "@/components/DetailsMedia/TopContent";
import CrewBanner from "@/components/DetailsMedia/Banners/CrewBanner";
import SimilarsBanner from "@/components/DetailsMedia/Banners/SimilarsBanner";
import RecommendationsBanner from "@/components/DetailsMedia/Banners/RecommendationsBanner";
import { TvShowDetails } from "@/models/tvShows";
import SeasonsAndEpisodesWrapper from "@/components/DetailsMedia/TvShow/SeasonsAndEpisodesWrapper";

type Props = {
  tvShowDetails: TvShowDetails;
  tvShowUrl: string;
};

const TvShowWrapper: FC<Props> = (props) => {
  const { tvShowDetails, tvShowUrl } = props;

  return (
    <div className="size-full">
      <TopContent
        accountStates={tvShowDetails?.account_states}
        backdropPath={tvShowDetails?.backdrop_path}
        creditsTvShows={tvShowDetails?.aggregate_credits}
        episodeRunTime={tvShowDetails?.episode_run_time}
        genresMedia={tvShowDetails?.genres}
        id={tvShowDetails?.id}
        nextEpisodeToAir={tvShowDetails?.next_episode_to_air}
        numberOfSeasons={tvShowDetails?.number_of_seasons}
        numberOfEpisodes={tvShowDetails?.number_of_episodes}
        originalLanguage={tvShowDetails?.original_language}
        overview={tvShowDetails?.overview}
        posterPath={tvShowDetails?.poster_path}
        status={tvShowDetails?.status}
        releaseDate={tvShowDetails?.first_air_date}
        tagline={tvShowDetails?.tagline}
        title={tvShowDetails?.name}
        type="tvshow"
        videos={tvShowDetails?.videos}
        voteAverage={tvShowDetails?.vote_average}
        voteCount={tvShowDetails?.vote_count}
        watchProvidersFr={tvShowDetails?.watch_providers_fr}
      />
      <CrewBanner
        castTvShow={tvShowDetails?.aggregate_credits?.cast}
        mediaUrl={tvShowUrl}
        type="tvshow"
      />
      {tvShowDetails?.seasons?.length > 0 && (
        <SeasonsAndEpisodesWrapper
          seasons={tvShowDetails.seasons.filter(
            (season) => season.season_number !== 0,
          )}
          tvShowId={tvShowDetails.id}
        />
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

export default TvShowWrapper;
