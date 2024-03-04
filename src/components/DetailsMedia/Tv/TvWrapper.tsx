import { FC } from "react";

import TopContent from "@/components/DetailsMedia/TopContent";
import CrewBanner from "@/components/DetailsMedia/Banners/CrewBanner";
import SimilarsBanner from "@/components/DetailsMedia/Banners/SimilarsBanner";
import { InternalTv, InternalTvAndUser, TvDetails } from "@/models/tvs";
import SeasonsAndEpisodesWrapper from "@/components/DetailsMedia/Tv/SeasonsAndEpisodesWrapper";

type Props = {
  tvDetails: TvDetails;
  tvUrl: string;
  internalTvs: InternalTv[];
  userTvs: InternalTvAndUser[];
};

const TvWrapper: FC<Props> = (props) => {
  const { tvDetails, tvUrl, internalTvs, userTvs } = props;

  return (
    <div className="size-full">
      <TopContent
        tvDetails={tvDetails}
        type="tv"
        internalTvs={internalTvs}
        userTvs={userTvs}
      />
      <CrewBanner
        castTv={tvDetails?.aggregate_credits?.cast}
        mediaUrl={tvUrl}
        type="tv"
      />
      {tvDetails?.seasons?.length > 0 && (
        <SeasonsAndEpisodesWrapper
          seasons={tvDetails.seasons.filter(
            (season) => season.season_number !== 0,
          )}
          tvId={tvDetails.id}
          userTvs={userTvs}
        />
      )}
      {tvDetails?.similar?.results?.length > 0 && (
        <SimilarsBanner
          similarsTvs={tvDetails.similar.results}
          totalPages={tvDetails.similar.total_pages}
          totalResults={tvDetails.similar.total_results}
          internalTvs={internalTvs}
          userTvs={userTvs}
        />
      )}
    </div>
  );
};

export default TvWrapper;
