import { FC } from "react";

import { Movie } from "@/models/movies";
import BannerWrapper from "@/components/Banner/BannerWrapper";
import { Tv } from "@/models/tvs";

type Props = {
  totalPages: number;
  totalResults: number;
  similarsMovies?: Movie[];
  similarsTvs?: Tv[];
};

const SimilarsBanner: FC<Props> = (props) => {
  const {
    totalPages,
    totalResults,
    similarsMovies,
    similarsTvs
  } = props;
  return (
    <div>
      {similarsMovies ? (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <BannerWrapper
            movieDetailsProps={{
              movies: similarsMovies,
              title: "Films similaires",
              totalPages,
              totalResults
            }}
          />
          <div className="mx-auto mb-0 mt-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      ) : similarsTvs ? (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <BannerWrapper
            tvsDetailsProps={{
              tvs: similarsTvs,
              title: "Séries TV similaires",
              totalPages,
              totalResults
            }}
          />
          <div className="mx-auto mb-0 mt-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      ) : null}
    </div>
  );
};

export default SimilarsBanner;
