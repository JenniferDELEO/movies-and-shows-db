/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FC, useContext, useEffect, useState } from "react";
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
import { UserContext } from "@/context/userContext";
import { List } from "@/models/lists";
import {
  getUserFavoriteMovies,
  getUserRatedMovies,
  getUserWatchListMovies,
} from "@/libs/api/movies";
import {
  getUserFavoriteTvShows,
  getUserRatedTvShows,
  getUserWatchlistTvShows,
} from "@/libs/api/tvshows";
import { getLists } from "@/libs/api/lists";

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

  const { user } = useContext(UserContext);

  const [favoriteMoviesIds, setFavoriteMoviesIds] = useState<number[]>([]);
  const [favoriteTvShowsIds, setFavoriteTvShowsIds] = useState<number[]>([]);

  const [watchlistMoviesIds, setWatchlistMoviesIds] = useState<number[]>([]);
  const [watchlistTvShowsIds, setWatchlistTvShowsIds] = useState<number[]>([]);

  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [ratedTvShows, setRatedTvShows] = useState<TvShow[]>([]);
  const [ratedMoviesIds, setRatedMoviesIds] = useState<number[]>([]);
  const [ratedTvShowsIds, setRatedTvShowsIds] = useState<number[]>([]);

  const [userLists, setUserLists] = useState<List[]>([]);

  async function fetchUserDatas() {
    if (user && user.tmdb_accountIdV4) {
      const responses = await Promise.all([
        getUserFavoriteMovies(user.tmdb_accountIdV4),
        getUserFavoriteTvShows(user.tmdb_accountIdV4),
        getUserWatchListMovies(user.tmdb_accountIdV4),
        getUserWatchlistTvShows(user.tmdb_accountIdV4),
        getUserRatedMovies(user.tmdb_accountIdV4),
        getUserRatedTvShows(user.tmdb_accountIdV4),
      ]);
      setFavoriteMoviesIds(responses[0].results.map((movie) => movie.id));
      setFavoriteTvShowsIds(responses[1].results.map((tv) => tv.id));
      setWatchlistMoviesIds(responses[2].results.map((movie) => movie.id));
      setWatchlistTvShowsIds(responses[3].results.map((tv) => tv.id));
      setRatedMovies(responses[4].results);
      setRatedTvShows(responses[5].results);
      setRatedMoviesIds(responses[4].results.map((movie) => movie.id));
      setRatedTvShowsIds(responses[5].results.map((tv) => tv.id));
    }
  }

  async function getUserList() {
    const res = await getLists();
    const listsResponse = res.results;
    listsResponse.unshift({
      id: "1",
      name: "Créer une nouvelle liste",
    });
    setUserLists(listsResponse);
  }

  useEffect(() => {
    if (user && user.tmdb_accountIdV4) {
      fetchUserDatas();
      getUserList();
    }
  }, [user]);

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
