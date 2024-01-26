"use client";

import Link from "next/link";
import { FC } from "react";

import { Collection } from "@/models/movies";

type Props = {
  belongsToCollection: Collection;
};

const CollectionCard: FC<Props> = (props) => {
  const { belongsToCollection } = props;

  return (
    <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(3,37,65,1) 0%, rgba(3,37,65,0.6) 100%), url(${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/original${belongsToCollection.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          maxHeight: 650,
          borderRadius: "8px",
        }}
        className="mx-auto my-4 flex h-[258px] w-[100%] flex-col items-center justify-center md:w-[90%]"
      >
        <h3 className="text-center text-xl">
          Fait partie de la collection {belongsToCollection.name}
        </h3>
        <Link
          className="mt-4 rounded-lg border-1 p-2"
          href={`/collection/${belongsToCollection.id}-${belongsToCollection.name
            .toLowerCase()
            .replace(/[\W_]+/g, "-")}`}
        >
          Accéder à la collection
        </Link>
      </div>
      <div className="mx-auto mb-0 mt-16 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
    </section>
  );
};

export default CollectionCard;
