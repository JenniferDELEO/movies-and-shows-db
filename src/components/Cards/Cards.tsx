import { FC } from "react";

import Card from "@/components/Cards/Card";
import { Genre, Movie } from "@/models/movies";
import { Tv } from "@/models/tvs";

type Props = {
  filterType: "movie" | "tv";
  genres: Genre[];
  movies?: Movie[];
  tvs?: Tv[];
};

const Cards: FC<Props> = (
  {
    movies,
    tvs,
    filterType,
    genres
  }) => {
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
      {tvs && (
        <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-2">
          {tvs.map((tv) => (
            <Card
              key={tv.id}
              tv={tv}
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
