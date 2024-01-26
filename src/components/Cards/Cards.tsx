import React, { FC } from "react";

import Card from "@/components/Cards/Card";
import { Movie } from "@/models/movies";
import { TvShow } from "@/models/tvShows";

type Props = {
  items: Movie[] | TvShow[];
  filterType: "movie" | "tvshow";
  genres: { id: number; name: string }[];
};

const Cards: FC<Props> = ({ items, filterType, genres }) => {
  return (
    <div className="w-full">
      <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-2">
        {items.map((item) => (
          <Card
            key={item.id}
            item={item}
            filterType={filterType}
            genres={genres}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
