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
  recommendationsMovies?: Movie[];
  recommendationsTvShows?: TvShow[];
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalMovies?: InternalMovie[];
  internalTvShows?: InternalTvShow[];
  userTvShows?: InternalTvShowAndUser[];
  userTvShowsId?: string;
};

const RecommendationsBanner: FC<Props> = (props) => {
  const {
    totalPages,
    totalResults,
    recommendationsMovies,
    recommendationsTvShows,
    userMovies,
    userMoviesId,
    internalMovies,
    userTvShows,
    userTvShowsId,
    internalTvShows,
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
              userMovies: userMovies || [],
              userMoviesId: userMoviesId || "",
              internalMovies: internalMovies || [],
            }}
          />
          <div className="mx-auto mb-0 mt-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      ) : recommendationsTvShows ? (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <BannerWrapper
            tvShowsDetailsProps={{
              tvShows: recommendationsTvShows,
              title: "Séries TV recommandées",
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

export default RecommendationsBanner;
