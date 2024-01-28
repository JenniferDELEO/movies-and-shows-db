import { FC } from "react";

import { Genre } from "@/models/movies";
import TopContent from "@/components/DetailsMedia/TopContent";
import { Collection } from "@/models/collections";
import MoviesInCollection from "./MoviesInCollection";

type Props = {
  collectionDetail: Collection;
  genresMovies: Genre[];
};

const CollectionWrapper: FC<Props> = (props) => {
  const { collectionDetail, genresMovies } = props;

  const allGenresIds =
    collectionDetail?.parts?.flatMap((part) => part.genre_ids) || [];

  const allGenres = genresMovies.filter((genre) =>
    allGenresIds.includes(genre.id),
  );

  const allVoteAverage = collectionDetail?.parts?.map(
    (part) => part.vote_average,
  );
  const voteAverage =
    allVoteAverage.reduce((a, b) => a + b, 0) / allVoteAverage.length;

  return (
    <div className="size-full">
      <TopContent
        backdropPath={collectionDetail?.backdrop_path}
        genresMedia={allGenres}
        id={collectionDetail?.id}
        isCollection={true}
        overview={collectionDetail?.overview}
        posterPath={collectionDetail?.poster_path}
        title={collectionDetail?.name}
        type="movie"
        voteAverage={voteAverage}
      />
      <MoviesInCollection movies={collectionDetail?.parts} />
    </div>
  );
};

export default CollectionWrapper;
