"use client";

import { Collection } from "@/models/movies";
import Link from "next/link";
import { FC } from "react";

type Props = {
  belongsToCollection: Collection;
};

const CollectionCard: FC<Props> = (props) => {
  const { belongsToCollection } = props;

  return (
    <section className="mx-auto mb-4 w-full p-4 sm:w-[90%] md:w-[80%] lg:w-[75%]">
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(3,37,65,1) 0%, rgba(3,37,65,0.6) 100%), url(${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/original${belongsToCollection.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "258px",
          maxHeight: 650,
          borderRadius: "8px",
        }}
        className="my-4 flex flex-col items-center justify-center "
      >
        <h3 className="text-xl">
          Fait partie de la collection {belongsToCollection.name}
        </h3>
        <Link
          className="mt-4 rounded-lg border-1 p-2"
          href={`/collection/${belongsToCollection.id}-${belongsToCollection.name
            .toLowerCase()
            .replace(/[" "]/g, "")
            .replace(/[^a-zA-Z0-9]/g, "-")}`}
        >
          Accéder à la collection
        </Link>
      </div>
      <div className="mx-auto mb-0 mt-16 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
    </section>
  );
};

export default CollectionCard;
