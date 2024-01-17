import { Movie } from "@/models/movies";
import { TvShow } from "@/models/tvShows";
import React, { FC } from "react";
import Card from "./Card";

type Props = {
  items: Movie[] | TvShow[];
  filterType: "movie" | "tv";
  genres: { id: number; name: string }[];
};

const Cards: FC<Props> = ({ items, filterType, genres }) => {
  if (!items) return <div>Chargement...</div>;
  return (
    <div className="w-full lg:w-[75%]">
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
