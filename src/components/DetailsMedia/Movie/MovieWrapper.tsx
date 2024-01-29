import { FC } from "react";

import { MovieDetails } from "@/models/movies";
import TopContent from "@/components/DetailsMedia/TopContent";
import CrewBanner from "@/components/DetailsMedia/Banners/CrewBanner";
import CollectionCard from "@/components/DetailsMedia/Movie/CollectionCard";
import SimilarsBanner from "@/components/DetailsMedia/Banners/SimilarsBanner";
import RecommendationsBanner from "@/components/DetailsMedia/Banners/RecommendationsBanner";

type Props = {
  movieDetail: MovieDetails;
  movieUrl: string;
};

const MovieWrapper: FC<Props> = (props) => {
  const { movieDetail, movieUrl } = props;

  return (
    <div className="size-full">
      <TopContent
        accountStates={movieDetail?.account_states}
        creditsMovies={movieDetail?.credits}
        backdropPath={movieDetail?.backdrop_path}
        genresMedia={movieDetail?.genres}
        id={movieDetail?.id}
        originalLanguage={movieDetail?.original_language}
        overview={movieDetail?.overview}
        posterPath={movieDetail?.poster_path}
        releaseDate={movieDetail?.release_date}
        runtime={movieDetail?.runtime}
        tagline={movieDetail?.tagline}
        title={movieDetail?.title}
        type="movie"
        videos={movieDetail?.videos}
        voteAverage={movieDetail?.vote_average}
        voteCount={movieDetail?.vote_count}
        watchProvidersFr={movieDetail?.watch_providers_fr}
      />
      <CrewBanner
        castMovie={movieDetail?.credits?.cast}
        mediaUrl={movieUrl}
        type="movie"
      />
      {movieDetail?.belongs_to_collection && (
        <CollectionCard
          belongsToCollection={movieDetail?.belongs_to_collection}
        />
      )}
      {movieDetail?.recommendations?.results.length > 0 ? (
        <RecommendationsBanner
          recommendationsMovies={movieDetail?.recommendations.results}
          totalPages={movieDetail?.recommendations?.total_pages}
          totalResults={movieDetail?.recommendations?.total_results}
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
      {movieDetail?.similar?.results.length > 0 && (
        <SimilarsBanner
          similarsMovies={movieDetail?.similar?.results}
          totalPages={movieDetail?.similar?.total_pages}
          totalResults={movieDetail?.similar?.total_results}
        />
      )}
    </div>
  );
};

export default MovieWrapper;
