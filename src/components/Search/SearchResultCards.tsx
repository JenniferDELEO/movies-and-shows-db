/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FC } from "react";
import Card from "../Cards/Card";
import {
  Genre,
  InternalMovie,
  InternalMovieUser,
  Movie,
} from "@/models/movies";
import { TvShow } from "@/models/tvShows";
import { People } from "@/models/people";
import PeopleCard from "../People/PeopleCard";

type Props = {
  filterType: string;
  searchResultsMovies?: Movie[];
  searchResultsTvShows?: TvShow[];
  searchResultsPeople?: People[];
  genresMovies?: Genre[];
  genresTvShows?: Genre[];
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalMovies?: InternalMovie[];
};

const SearchResultCards: FC<Props> = (props) => {
  const {
    filterType,
    searchResultsMovies,
    searchResultsTvShows,
    searchResultsPeople,
    genresMovies,
    genresTvShows,
    userMovies,
    userMoviesId,
    internalMovies,
  } = props;

  return (
    <>
      {filterType === "movie" && searchResultsMovies && genresMovies ? (
        <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-4">
          {searchResultsMovies.map((movie: Movie) => (
            <Card
              key={movie.id}
              movie={movie}
              filterType={filterType}
              genres={genresMovies}
              userMovies={userMovies}
              userMoviesId={userMoviesId}
              internalMovies={internalMovies}
            />
          ))}
        </div>
      ) : filterType === "tv" && searchResultsTvShows && genresTvShows ? (
        <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-4">
          {searchResultsTvShows.map((tvShow: TvShow) => (
            <Card
              key={tvShow.id}
              tvShow={tvShow}
              filterType={filterType}
              genres={genresTvShows}
            />
          ))}
        </div>
      ) : (
        searchResultsPeople && (
          <div className="mx-auto grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 xl:gap-4">
            {searchResultsPeople.map((item: People) => (
              <PeopleCard key={item.id} item={item} />
            ))}
          </div>
        )
      )}
    </>
  );
};

export default SearchResultCards;
