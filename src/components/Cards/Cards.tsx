import { FC } from "react";

import Card from "@/components/Cards/Card";
import {
  Genre,
  InternalMovie,
  InternalMovieUser,
  Movie,
} from "@/models/movies";
import { TvShow } from "@/models/tvShows";

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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
