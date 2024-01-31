import {
  Episode,
  EpisodeDetails,
  SeasonDetails,
  TvShowDetails,
} from "@/models/tvShows";
import { FC } from "react";
import TopContent from "../TopContent";
import EpisodesBanner from "./EpisodesBanner";

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

  return (
    <div className="size-full">
      <TopContent
        creditsTvShows={episodeDetails?.credits}
        episodeNumber={episodeNumber}
        episodePrecedent={episodePrecedent}
        episodeRunTime={[episodeDetails?.runtime]}
        genresMedia={tvShowDetails?.genres}
        id={episodeDetails?.id}
        originalLanguage={tvShowDetails?.original_language}
        overview={episodeDetails?.overview}
        releaseDate={episodeDetails?.air_date}
        seasonNumber={seasonNumber}
        status={tvShowDetails?.status}
        stillPath={episodeDetails?.still_path}
        title={episodeDetails?.name}
        type="episode"
        videos={episodeDetails?.videos}
        voteAverage={episodeDetails?.vote_average}
        voteCount={episodeDetails?.vote_count}
      />
      <EpisodesBanner seasonDetails={seasonDetails} />
    </div>
  );
};

export default EpisodeWrapper;
