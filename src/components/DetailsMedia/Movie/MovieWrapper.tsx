import { FC } from "react";

import {
  InternalMovie,
  InternalMovieUser,
  MovieDetails,
} from "@/models/movies";
import TopContent from "@/components/DetailsMedia/TopContent";
import CrewBanner from "@/components/DetailsMedia/Banners/CrewBanner";
import CollectionCard from "@/components/DetailsMedia/Movie/CollectionCard";
import SimilarsBanner from "@/components/DetailsMedia/Banners/SimilarsBanner";
import RecommendationsBanner from "@/components/DetailsMedia/Banners/RecommendationsBanner";

type Props = {
  movieDetails: MovieDetails;
  movieUrl: string;
  userMovies: InternalMovieUser[];
  userMoviesId: string;
  internalMovies: InternalMovie[];
};

const MovieWrapper: FC<Props> = (props) => {
  const { movieDetails, movieUrl, userMovies, userMoviesId, internalMovies } =
    props;

  return (
    <div className="size-full">
      <TopContent
        movieDetails={movieDetails}
        type="movie"
        userMovies={userMovies}
        userMoviesId={userMoviesId}
        internalMovies={internalMovies}
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
      {movieDetails?.recommendations?.results.length > 0 ? (
        <RecommendationsBanner
          recommendationsMovies={movieDetails?.recommendations.results}
          totalPages={movieDetails?.recommendations?.total_pages}
          totalResults={movieDetails?.recommendations?.total_results}
          userMovies={userMovies}
          userMoviesId={userMoviesId}
          internalMovies={internalMovies}
        />
      ) : (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <h1 className="pl-5 text-xl font-bold tracking-wide">
            Recommandations
          </h1>
          <p className="mb-4 py-4 pl-5 text-base md:text-lg">
            Nous n&apos;avons pas suffisamment de données pour vous suggérer des
            films. Vous pouvez nous y aider en notant les films que vous avez
            vus.
          </p>
        </section>
      )}
      {movieDetails?.similar?.results.length > 0 && (
        <SimilarsBanner
          similarsMovies={movieDetails?.similar?.results}
          totalPages={movieDetails?.similar?.total_pages}
          totalResults={movieDetails?.similar?.total_results}
          userMovies={userMovies}
          userMoviesId={userMoviesId}
          internalMovies={internalMovies}
        />
      )}
    </div>
  );
};

export default MovieWrapper;
