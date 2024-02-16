import { FC } from "react";

import { InternalMovie, InternalMovieUser, Movie } from "@/models/movies";
import BannerWrapper from "@/components/Banner/BannerWrapper";
import { InternalTv, InternalTvAndUser, Tv } from "@/models/tvs";

type Props = {
  totalPages: number;
  totalResults: number;
  recommendationsMovies?: Movie[];
  recommendationsTvs?: Tv[];
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalMovies?: InternalMovie[];
  internalTvs?: InternalTv[];
  userTvs?: InternalTvAndUser[];
  userTvsId?: string;
};

const RecommendationsBanner: FC<Props> = (props) => {
  const {
    totalPages,
    totalResults,
    recommendationsMovies,
    recommendationsTvs,
    userMovies,
    userMoviesId,
    internalMovies,
    userTvs,
    userTvsId,
    internalTvs,
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
      ) : recommendationsTvs ? (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <BannerWrapper
            tvsDetailsProps={{
              tvs: recommendationsTvs,
              title: "Séries TV recommandées",
              totalPages,
              totalResults,
              userTvs: userTvs || [],
              userTvsId: userTvsId || "",
              internalTvs: internalTvs || [],
            }}
          />
          <div className="mx-auto mb-0 mt-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      ) : null}
    </div>
  );
};

export default RecommendationsBanner;
