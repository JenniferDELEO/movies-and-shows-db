import { FC } from "react";

import Card from "@/components/Cards/Card";
import {
  Genre,
  InternalMovie,
  InternalMovieUser,
  Movie,
} from "@/models/movies";
import { InternalTv, InternalTvAndUser, Tv } from "@/models/tvs";
import { TmdbFetcher } from "@/libs/helpers/TmdbFetcher";

type Props = {
  filterType: "movie" | "tv";
  genres: Genre[];
  movies?: Movie[];
  tvs?: Tv[];
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalMovies?: InternalMovie[];
  userTvs?: InternalTvAndUser[];
  userTvsId?: string;
  internalTvs?: InternalTv[];
};

const Cards: FC<Props> = ({
  movies,
  tvs,
  filterType,
  genres,
  userMovies,
  userMoviesId,
  internalMovies,
  userTvs,
  userTvsId,
  internalTvs,
}) => {
  const {
    fetchUserDatas,
    favoriteMoviesIds,
    watchlistMoviesIds,
    favoriteTvsIds,
    watchlistTvsIds,
    ratedMovies,
    ratedTvs,
    ratedMoviesIds,
    ratedTvsIds,
    userLists,
  } = TmdbFetcher();

  return (
    <div className="w-full">
      {movies && userMovies && userMoviesId && internalMovies && (
        <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-2">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              filterType={filterType}
              genres={genres}
              fetchUserDatas={fetchUserDatas}
              favoriteMoviesIds={favoriteMoviesIds}
              watchlistMoviesIds={watchlistMoviesIds}
              favoriteTvsIds={favoriteTvsIds}
              watchlistTvsIds={watchlistTvsIds}
              ratedMovies={ratedMovies}
              ratedTvs={ratedTvs}
              ratedMoviesIds={ratedMoviesIds}
              ratedTvsIds={ratedTvsIds}
              userLists={userLists}
              userMovies={userMovies}
              userMoviesId={userMoviesId}
              internalMovies={internalMovies}
            />
          ))}
        </div>
      )}
      {tvs && (
        <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-2">
          {tvs.map((tv) => (
            <Card
              key={tv.id}
              tv={tv}
              filterType={filterType}
              genres={genres}
              fetchUserDatas={fetchUserDatas}
              favoriteMoviesIds={favoriteMoviesIds}
              watchlistMoviesIds={watchlistMoviesIds}
              favoriteTvsIds={favoriteTvsIds}
              watchlistTvsIds={watchlistTvsIds}
              ratedMovies={ratedMovies}
              ratedTvs={ratedTvs}
              ratedMoviesIds={ratedMoviesIds}
              ratedTvsIds={ratedTvsIds}
              userLists={userLists}
              userTvs={userTvs}
              userTvsId={userTvsId}
              internalTvs={internalTvs}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
