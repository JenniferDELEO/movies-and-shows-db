import type { Metadata } from "next";

import { getCollection } from "@/libs/api/collections";
import CollectionWrapper from "@/components/DetailsMedia/Collection/CollectionWrapper";
import { getGenresMovies } from "@/libs/api/movies";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = Number(params.id.split("-")[0]);

  const collection = await getCollection(id);

  return {
    title: `${collection.name} - Films & Séries TV DB`,
  };
}

const Collection = async ({ params }: Props) => {
  const id = Number(params.id.split("-")[0]);

  const collectionDetails = await getCollection(id);
  const genres = await getGenresMovies();

  return (
    <div>
      <CollectionWrapper
        collectionDetails={collectionDetails}
        genresMovies={genres.genres}
      />
    </div>
  );
};

export default Collection;
