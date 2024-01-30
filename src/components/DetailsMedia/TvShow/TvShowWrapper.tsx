import { FC } from "react";

import TopContent from "@/components/DetailsMedia/TopContent";
import CrewBanner from "@/components/DetailsMedia/Banners/CrewBanner";
import SimilarsBanner from "@/components/DetailsMedia/Banners/SimilarsBanner";
import RecommendationsBanner from "@/components/DetailsMedia/Banners/RecommendationsBanner";
import { TvShowDetails } from "@/models/tvShows";
import SeasonsAndEpisodesWrapper from "@/components/DetailsMedia/TvShow/SeasonsAndEpisodesWrapper";

type Props = {
  tvShowDetail: TvShowDetails;
  tvShowUrl: string;
};

const TvShowWrapper: FC<Props> = (props) => {
  const { tvShowDetail, tvShowUrl } = props;

  return (
    <div className="size-full">
      <TopContent
        accountStates={tvShowDetail?.account_states}
        backdropPath={tvShowDetail?.backdrop_path}
        creditsTvShows={tvShowDetail?.aggregate_credits}
        episodeRunTime={tvShowDetail?.episode_run_time}
        genresMedia={tvShowDetail?.genres}
        id={tvShowDetail?.id}
        numberOfSeasons={tvShowDetail?.number_of_seasons}
        numberOfEpisodes={tvShowDetail?.number_of_episodes}
        originalLanguage={tvShowDetail?.original_language}
        overview={tvShowDetail?.overview}
        posterPath={tvShowDetail?.poster_path}
        status={tvShowDetail?.status}
        releaseDate={tvShowDetail?.first_air_date}
        tagline={tvShowDetail?.tagline}
        title={tvShowDetail?.name}
        type="tvshow"
        videos={tvShowDetail?.videos}
        voteAverage={tvShowDetail?.vote_average}
        voteCount={tvShowDetail?.vote_count}
      />
      <CrewBanner
        castTvShow={tvShowDetail?.aggregate_credits?.cast}
        mediaUrl={tvShowUrl}
        type="tvshow"
      />
      {tvShowDetail?.seasons.length > 0 && (
        <SeasonsAndEpisodesWrapper
          seasons={tvShowDetail.seasons}
          tvShowId={tvShowDetail.id}
        />
      )}
      {tvShowDetail?.recommendations?.results.length > 0 ? (
        <RecommendationsBanner
          recommendationsTvShows={tvShowDetail.recommendations.results}
          totalPages={tvShowDetail.recommendations.total_pages}
          totalResults={tvShowDetail.recommendations.total_results}
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
      {tvShowDetail?.similar?.results.length > 0 && (
        <SimilarsBanner
          similarsTvShows={tvShowDetail.similar.results}
          totalPages={tvShowDetail.similar.total_pages}
          totalResults={tvShowDetail.similar.total_results}
        />
      )}
    </div>
  );
};

export default TvShowWrapper;
