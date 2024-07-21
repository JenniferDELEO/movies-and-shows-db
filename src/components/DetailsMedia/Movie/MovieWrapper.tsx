import { FC } from "react";

import { MovieDetails } from "@/models/movies";
import TopContent from "@/components/DetailsMedia/TopContent";
import CrewBanner from "@/components/DetailsMedia/Banners/CrewBanner";
import CollectionCard from "@/components/DetailsMedia/Movie/CollectionCard";
import SimilarsBanner from "@/components/DetailsMedia/Banners/SimilarsBanner";

type Props = {
  movieDetails: MovieDetails;
  movieUrl: string;
};

const MovieWrapper: FC<Props> = (props) => {
  const { movieDetails, movieUrl } =
    props;

  return (
    <div className="size-full">
      <TopContent
        movieDetails={movieDetails}
        type="movie"
      />
      <CrewBanner
        castMovie={movieDetails?.credits?.cast}
        mediaUrl={movieUrl}
        type="movie"
      />
      {movieDetails?.belongs_to_collection && (
        <CollectionCard
          belongsToCollection={movieDetails?.belongs_to_collection}
        />
      )}
      {movieDetails?.similar?.results.length > 0 && (
        <SimilarsBanner
          similarsMovies={movieDetails?.similar?.results}
          totalPages={movieDetails?.similar?.total_pages}
          totalResults={movieDetails?.similar?.total_results}
        />
      )}
    </div>
  );
};

export default MovieWrapper;
