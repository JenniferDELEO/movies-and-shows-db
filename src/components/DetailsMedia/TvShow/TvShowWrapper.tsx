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
      {tvShowDetail?.recommendations?.results.length > 0 && (
        <RecommendationsBanner
          recommendationsTvShows={tvShowDetail.recommendations.results}
          totalPages={tvShowDetail.recommendations.total_pages}
        />
      )}
      {tvShowDetail?.similar?.results.length > 0 && (
        <SimilarsBanner
          similarsTvShows={tvShowDetail.similar.results}
          totalPages={tvShowDetail.similar.total_pages}
        />
      )}
    </div>
  );
};

export default TvShowWrapper;
