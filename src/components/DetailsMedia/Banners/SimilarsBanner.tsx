import { FC } from "react";

import { InternalMovie, InternalMovieUser, Movie } from "@/models/movies";
import BannerWrapper from "@/components/Banner/BannerWrapper";
import {
  InternalTvShow,
  InternalTvShowAndUser,
  TvShow,
} from "@/models/tvShows";

type Props = {
  totalPages: number;
  totalResults: number;
  similarsMovies?: Movie[];
  similarsTvShows?: TvShow[];
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalMovies?: InternalMovie[];
  userTvShows?: InternalTvShowAndUser[];
  userTvShowsId?: string;
  internalTvShows?: InternalTvShow[];
};

const SimilarsBanner: FC<Props> = (props) => {
  const {
    totalPages,
    totalResults,
    similarsMovies,
    similarsTvShows,
    userMovies,
    userMoviesId,
    internalMovies,
    userTvShows,
    userTvShowsId,
    internalTvShows,
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
      ) : similarsTvShows ? (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <BannerWrapper
            tvShowsDetailsProps={{
              tvShows: similarsTvShows,
              title: "Séries TV similaires",
              totalPages,
              totalResults,
              userTvShows: userTvShows || [],
              userTvShowsId: userTvShowsId || "",
              internalTvShows: internalTvShows || [],
            }}
          />
          <div className="mx-auto mb-0 mt-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      ) : null}
    </div>
  );
};

export default SimilarsBanner;
