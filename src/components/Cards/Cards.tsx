import { FC } from "react";

import Card from "@/components/Cards/Card";
import {
  Genre,
  InternalMovie,
  InternalMovieUser,
  Movie,
} from "@/models/movies";
import { TvShow } from "@/models/tvShows";
import { TmdbFetcher } from "@/libs/helpers/TmdbFetcher";

type Props = {
  filterType: "movie" | "tvshow";
  genres: Genre[];
  movies?: Movie[];
  tvShows?: TvShow[];
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalMovies?: InternalMovie[];
};

const Cards: FC<Props> = ({
  movies,
  tvShows,
  filterType,
  genres,
  userMovies,
  userMoviesId,
  internalMovies,
}) => {
  const {
    fetchUserDatas,
    favoriteMoviesIds,
    watchlistMoviesIds,
    favoriteTvShowsIds,
    watchlistTvShowsIds,
    ratedMovies,
    ratedTvShows,
    ratedMoviesIds,
    ratedTvShowsIds,
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
              favoriteTvShowsIds={favoriteTvShowsIds}
              watchlistTvShowsIds={watchlistTvShowsIds}
              ratedMovies={ratedMovies}
              ratedTvShows={ratedTvShows}
              ratedMoviesIds={ratedMoviesIds}
              ratedTvShowsIds={ratedTvShowsIds}
              userLists={userLists}
              userMovies={userMovies}
              userMoviesId={userMoviesId}
              internalMovies={internalMovies}
            />
          ))}
        </div>
      )}
      {tvShows && (
        <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-2">
          {tvShows.map((tvShow) => (
            <Card
              key={tvShow.id}
              tvShow={tvShow}
              filterType={filterType}
              genres={genres}
              fetchUserDatas={fetchUserDatas}
              favoriteMoviesIds={favoriteMoviesIds}
              watchlistMoviesIds={watchlistMoviesIds}
              favoriteTvShowsIds={favoriteTvShowsIds}
              watchlistTvShowsIds={watchlistTvShowsIds}
              ratedMovies={ratedMovies}
              ratedTvShows={ratedTvShows}
              ratedMoviesIds={ratedMoviesIds}
              ratedTvShowsIds={ratedTvShowsIds}
              userLists={userLists}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
