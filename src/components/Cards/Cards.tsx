import { Movie } from "@/models/movies";
import { TvShow } from "@/models/tvShows";
import React, { FC } from "react";
import Card from "./Card";

type Props = {
  items: Movie[] | TvShow[];
  filterType: "movie" | "tv";
};

const Cards: FC<Props> = ({ items, filterType }) => {
  if (!items) return <div>Chargement...</div>;
  return (
    <div className="w-full lg:w-[75%]">
      <div className="xl:grid xl:grid-cols-2 xl:gap-2">
        {items.map((item) => (
          <Card key={item.id} item={item} filterType={filterType} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
