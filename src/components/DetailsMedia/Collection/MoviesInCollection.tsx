import { FC } from "react";

import { InternalMovie, InternalMovieUser, Movie } from "@/models/movies";
import BannerWrapper from "@/components/Banner/BannerWrapper";

type Props = {
  movies: Movie[];
  userMovies: InternalMovieUser[];
  userMoviesId: string;
  internalMovies: InternalMovie[];
};

const MoviesInCollection: FC<Props> = (props) => {
  const { movies, userMovies, userMoviesId, internalMovies } = props;
  return (
    <div>
      {movies.length > 0 ? (
        <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
          <BannerWrapper
            movieCollectionProps={{
              movies,
              title: `Films de la collection (${movies.length})`,
              userMovies,
              userMoviesId,
              internalMovies,
            }}
          />
          <div className="mx-auto mb-0 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
        </section>
      ) : null}
    </div>
  );
};

export default MoviesInCollection;
