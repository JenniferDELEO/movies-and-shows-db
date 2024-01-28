import React, { FC } from "react";

import Card from "@/components/Cards/Card";
import { Movie } from "@/models/movies";
import { TvShow } from "@/models/tvShows";

type Props = {
  filterType: "movie" | "tvshow";
  genres: { id: number; name: string }[];
  movies?: Movie[];
  tvShows?: TvShow[];
};

const Cards: FC<Props> = ({ movies, tvShows, filterType, genres }) => {
  return (
    <div className="w-full">
      {movies && (
        <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-2">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              filterType={filterType}
              genres={genres}
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
