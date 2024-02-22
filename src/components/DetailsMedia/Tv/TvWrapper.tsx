import { FC } from "react";

import TopContent from "@/components/DetailsMedia/TopContent";
import CrewBanner from "@/components/DetailsMedia/Banners/CrewBanner";
import SimilarsBanner from "@/components/DetailsMedia/Banners/SimilarsBanner";
import RecommendationsBanner from "@/components/DetailsMedia/Banners/RecommendationsBanner";
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
      {tvDetails?.recommendations?.results?.length > 0 ? (
        <RecommendationsBanner
          recommendationsTvs={tvDetails.recommendations.results}
          totalPages={tvDetails.recommendations.total_pages}
          totalResults={tvDetails.recommendations.total_results}
          internalTvs={internalTvs}
          userTvs={userTvs}
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
          internalTvs={internalTvs}
          userTvs={userTvs}
        />
      )}
    </div>
  );
};

export default TvWrapper;
