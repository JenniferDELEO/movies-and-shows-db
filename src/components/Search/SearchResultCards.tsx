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
import { Tv } from "@/models/tvs";
import { People } from "@/models/people";
import PeopleCard from "../People/PeopleCard";

type Props = {
  filterType: string;
  searchResultsMovies?: Movie[];
  searchResultsTvs?: Tv[];
  searchResultsPeople?: People[];
  genresMovies?: Genre[];
  genresTvs?: Genre[];
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalMovies?: InternalMovie[];
};

const SearchResultCards: FC<Props> = (props) => {
  const {
    filterType,
    searchResultsMovies,
    searchResultsTvs,
    searchResultsPeople,
    genresMovies,
    genresTvs,
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
      ) : filterType === "tv" && searchResultsTvs && genresTvs ? (
        <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-4">
          {searchResultsTvs.map((tv: Tv) => (
            <Card
              key={tv.id}
              tv={tv}
              filterType={filterType}
              genres={genresTvs}
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
