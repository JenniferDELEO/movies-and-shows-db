import { MovieDetails } from "@/models/movies";
import { FC } from "react";
import TopContent from "../TopContent";
import CrewBanner from "../CrewBanner";
import CollectionCard from "./CollectionCard";
import Similar from "../Similars";
import Recommendations from "../Recommendations";

type Props = {
  movieDetail: MovieDetails;
  genres: {
    id: number;
    name: string;
  }[];
  movieUrl: string;
};

const MovieWrapper: FC<Props> = (props) => {
  const { movieDetail, genres, movieUrl } = props;

  return (
    <div className="size-full">
      <TopContent
        genres={genres}
        genresMedia={movieDetail?.genres}
        backdropPath={movieDetail?.backdrop_path}
        posterPath={movieDetail?.poster_path}
        title={movieDetail?.title}
        videos={movieDetail?.videos}
        runtime={movieDetail?.runtime}
        credits={movieDetail?.credits}
        releaseDate={movieDetail?.release_date}
        voteAverage={movieDetail?.vote_average}
        voteCount={movieDetail?.vote_count}
        tagline={movieDetail?.tagline}
        overview={movieDetail?.overview}
      />
      <CrewBanner cast={movieDetail?.credits?.cast} movieUrl={movieUrl} />
      {movieDetail?.belongs_to_collection && (
        <CollectionCard
          belongsToCollection={movieDetail?.belongs_to_collection}
        />
      )}
      <Similar
        similars={movieDetail?.similar?.results}
        totalResults={movieDetail?.similar?.total_results}
      />
      <Recommendations
        recommendations={movieDetail?.recommendations.results}
        totalResults={movieDetail?.recommendations?.total_results}
      />
    </div>
  );
};

export default MovieWrapper;
