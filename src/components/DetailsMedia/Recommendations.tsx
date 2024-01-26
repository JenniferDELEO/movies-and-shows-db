import { FC } from "react";

import { Movie } from "@/models/movies";
import BannerWrapper from "@/components/Banner/BannerWrapper";
import { TvShow } from "@/models/tvShows";

type Props = {
  recommendationsMovies?: Movie[];
  recommendationsTvShows?: TvShow[];
  totalPages: number;
};

const Recommendations: FC<Props> = (props) => {
  const { recommendationsMovies, recommendationsTvShows, totalPages } = props;

  return (
    <div>
      {recommendationsMovies ? (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <BannerWrapper
            movieDetailsProps={{
              movies: recommendationsMovies,
              title: "Recommendations",
              totalPages,
            }}
          />
          <div className="mx-auto mb-0 mt-16 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      ) : recommendationsTvShows ? (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <BannerWrapper
            tvshowsDetailsProps={{
              tvshows: recommendationsTvShows,
              title: "Recommendations",
              totalPages,
            }}
          />
          <div className="mx-auto mb-0 mt-16 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      ) : null}
    </div>
  );
};

export default Recommendations;
