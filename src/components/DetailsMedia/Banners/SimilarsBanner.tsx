import { FC } from "react";

import { InternalMovie, InternalMovieUser, Movie } from "@/models/movies";
import BannerWrapper from "@/components/Banner/BannerWrapper";
import { InternalTv, InternalTvAndUser, Tv } from "@/models/tvs";

type Props = {
  totalPages: number;
  totalResults: number;
  similarsMovies?: Movie[];
  similarsTvs?: Tv[];
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalMovies?: InternalMovie[];
  userTvs?: InternalTvAndUser[];
  internalTvs?: InternalTv[];
};

const SimilarsBanner: FC<Props> = (props) => {
  const {
    totalPages,
    totalResults,
    similarsMovies,
    similarsTvs,
    userMovies,
    userMoviesId,
    internalMovies,
    userTvs,
    internalTvs,
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
              totalResults,
              userMovies: userMovies || [],
              userMoviesId: userMoviesId || "",
              internalMovies: internalMovies || [],
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
              totalResults,
              userTvs: userTvs || [],
              internalTvs: internalTvs || [],
            }}
          />
          <div className="mx-auto mb-0 mt-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      ) : null}
    </div>
  );
};

export default SimilarsBanner;
