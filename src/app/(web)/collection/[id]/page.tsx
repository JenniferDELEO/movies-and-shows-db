import type { Metadata } from "next";

import { getCollection } from "@/libs/api/collections";
import CollectionWrapper from "@/components/DetailsMedia/Collection/CollectionWrapper";
import { getGenresMovies } from "@/libs/api/movies";
import { InternalMovieUser } from "@/models/movies";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/sanity/auth";
import { getAllMovies, getUserMovies } from "@/libs/sanity/api/movie";

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
  const session = await getServerSession(authOptions);

  const id = Number(params.id.split("-")[0]);

  const collectionDetails = await getCollection(id);
  const genres = await getGenresMovies();

  let userMovies: InternalMovieUser[] = [];
  let userMoviesId: string = "";
  if (session) {
    const results = await getUserMovies(session.user.id);
    userMovies = results?.movies || [];
    userMoviesId = results?._id;
  }

  const internalMovies = await getAllMovies();

  return (
    <div>
      <CollectionWrapper
        collectionDetails={collectionDetails}
        genresMovies={genres.genres}
        userMovies={userMovies}
        userMoviesId={userMoviesId}
        internalMovies={internalMovies}
      />
    </div>
  );
};

export default Collection;
