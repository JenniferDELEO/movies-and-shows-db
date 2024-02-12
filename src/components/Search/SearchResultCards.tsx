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
import { TmdbFetcher } from "@/libs/helpers/TmdbFetcher";

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

  const {
    fetchUserDatas,
    favoriteMoviesIds,
    watchlistMoviesIds,
    favoriteTvShowsIds,
    watchlistTvShowsIds,
    ratedMovies,
    ratedTvShows,
    ratedMoviesIds,
    ratedTvShowsIds,
    userLists,
  } = TmdbFetcher();

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
              fetchUserDatas={fetchUserDatas}
              favoriteMoviesIds={favoriteMoviesIds}
              watchlistMoviesIds={watchlistMoviesIds}
              favoriteTvShowsIds={favoriteTvShowsIds}
              watchlistTvShowsIds={watchlistTvShowsIds}
              ratedMovies={ratedMovies}
              ratedTvShows={ratedTvShows}
              ratedMoviesIds={ratedMoviesIds}
              ratedTvShowsIds={ratedTvShowsIds}
              userLists={userLists}
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
              fetchUserDatas={fetchUserDatas}
              favoriteMoviesIds={favoriteMoviesIds}
              watchlistMoviesIds={watchlistMoviesIds}
              favoriteTvShowsIds={favoriteTvShowsIds}
              watchlistTvShowsIds={watchlistTvShowsIds}
              ratedMovies={ratedMovies}
              ratedTvShows={ratedTvShows}
              ratedMoviesIds={ratedMoviesIds}
              ratedTvShowsIds={ratedTvShowsIds}
              userLists={userLists}
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
