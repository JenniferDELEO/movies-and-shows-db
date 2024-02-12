import { FC } from "react";

import { Genre } from "@/models/movies";
import TopContent from "@/components/DetailsMedia/TopContent";
import { Collection } from "@/models/collections";
import MoviesInCollection from "./MoviesInCollection";

type Props = {
  collectionDetails: Collection;
  genresMovies: Genre[];
};

const CollectionWrapper: FC<Props> = (props) => {
  const { collectionDetails, genresMovies } = props;

  const allGenresIds =
    collectionDetails?.parts?.flatMap((part) => part.genre_ids) || [];

  const allGenres = genresMovies.filter((genre) =>
    allGenresIds.includes(genre.id),
  );

  const allVoteAverage = collectionDetails?.parts?.map(
    (part) => part.vote_average,
  );
  const voteAverage =
    allVoteAverage.reduce((a, b) => a + b, 0) / allVoteAverage.length;

  return (
    <div className="size-full">
      <TopContent
        collectionDetails={collectionDetails}
        genresCollection={allGenres}
        isCollection={true}
        type="movie"
        voteAverageCollection={voteAverage}
      />
      <MoviesInCollection movies={collectionDetails?.parts} />
    </div>
  );
};

export default CollectionWrapper;
