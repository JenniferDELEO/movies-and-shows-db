import { FC } from "react";

import { Movie } from "@/models/movies";
import BannerWrapper from "@/components/Banner/BannerWrapper";
import { TvShow } from "@/models/tvShows";

type Props = {
  totalPages: number;
  totalResults: number;
  recommendationsMovies?: Movie[];
  recommendationsTvShows?: TvShow[];
};

const RecommendationsBanner: FC<Props> = (props) => {
  const {
    totalPages,
    totalResults,
    recommendationsMovies,
    recommendationsTvShows,
  } = props;

  return (
    <div>
      {recommendationsMovies ? (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <BannerWrapper
            movieDetailsProps={{
              movies: recommendationsMovies,
              title: "Films recommandés",
              totalPages,
              totalResults,
            }}
          />
          <div className="mx-auto mb-0 mt-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      ) : recommendationsTvShows ? (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <BannerWrapper
            tvshowsDetailsProps={{
              tvshows: recommendationsTvShows,
              title: "Séries TV recommandées",
              totalPages,
              totalResults,
            }}
          />
          <div className="mx-auto mb-0 mt-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      ) : null}
    </div>
  );
};

export default RecommendationsBanner;
