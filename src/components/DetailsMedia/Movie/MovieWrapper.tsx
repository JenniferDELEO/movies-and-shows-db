import { FC } from "react";

import { MovieDetails } from "@/models/movies";
import TopContent from "@/components/DetailsMedia/TopContent";
import CrewBanner from "@/components/DetailsMedia/CrewBanner";
import CollectionCard from "@/components/DetailsMedia/Movie/CollectionCard";
import Similar from "@/components/DetailsMedia/Similars";
import Recommendations from "@/components/DetailsMedia/Recommendations";

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
      {movieDetail?.recommendations?.results.length > 0 && (
        <Recommendations
          recommendationsMovies={movieDetail?.recommendations.results}
          totalPages={movieDetail?.recommendations?.total_pages}
        />
      )}
      {movieDetail?.similar?.results.length > 0 && (
        <Similar
          similarsMovies={movieDetail?.similar?.results}
          totalPages={movieDetail?.similar?.total_pages}
        />
      )}
    </div>
  );
};

export default MovieWrapper;
