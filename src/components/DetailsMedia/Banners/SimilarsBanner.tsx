import { FC } from "react";

import { Movie } from "@/models/movies";
import BannerWrapper from "@/components/Banner/BannerWrapper";
import { TvShow } from "@/models/tvShows";

type Props = {
  totalPages: number;
  similarsMovies?: Movie[];
  similarsTvShows?: TvShow[];
};

const SimilarsBanner: FC<Props> = (props) => {
  const { similarsMovies, similarsTvShows, totalPages } = props;
  return (
    <div>
      {similarsMovies ? (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <BannerWrapper
            movieDetailsProps={{
              movies: similarsMovies,
              title: "Films similaires",
              totalPages,
            }}
          />
          <div className="mx-auto mb-0 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      ) : similarsTvShows ? (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <BannerWrapper
            tvshowsDetailsProps={{
              tvshows: similarsTvShows,
              title: "Séries TV similaires",
              totalPages,
            }}
          />
          <div className="mx-auto mb-0 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      ) : null}
    </div>
  );
};

export default SimilarsBanner;
