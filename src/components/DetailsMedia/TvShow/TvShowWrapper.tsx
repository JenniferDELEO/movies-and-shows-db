import { FC } from "react";

import TopContent from "@/components/DetailsMedia/TopContent";
import CrewBanner from "@/components/DetailsMedia/Banners/CrewBanner";
import SimilarsBanner from "@/components/DetailsMedia/Banners/SimilarsBanner";
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
      <TopContent tvShowDetails={tvShowDetails} type="tvshow" />
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
