/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";

import { Movie } from "@/models/movies";
import { Tv } from "@/models/tvs";
import { UserContext } from "@/context/userContext";
import {
  getUserFavoriteMovies,
  getUserRatedMovies,
  getUserWatchListMovies,
} from "@/libs/api/movies";
import {
  getUserFavoriteTvs,
  getUserRatedTvs,
  getUserWatchlistTvs,
} from "@/libs/api/tvs";
import { List } from "@/models/lists";
import { getLists } from "@/libs/api/lists";

export const TmdbFetcher = () => {
  const [favoriteMoviesIds, setFavoriteMoviesIds] = useState<number[]>([]);
  const [favoriteTvsIds, setFavoriteTvsIds] = useState<number[]>([]);

  const [watchlistMoviesIds, setWatchlistMoviesIds] = useState<number[]>([]);
  const [watchlistTvsIds, setWatchlistTvsIds] = useState<number[]>([]);

  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [ratedTvs, setRatedTvs] = useState<Tv[]>([]);
  const [ratedMoviesIds, setRatedMoviesIds] = useState<number[]>([]);
  const [ratedTvsIds, setRatedTvsIds] = useState<number[]>([]);

  const [userLists, setUserLists] = useState<List[]>([]);

  const { user } = useContext(UserContext);

  async function fetchUserDatas() {
    if (user && user.tmdb_accountIdV4) {
      const responses = await Promise.all([
        getUserFavoriteMovies(user.tmdb_accountIdV4),
        getUserFavoriteTvs(user.tmdb_accountIdV4),
        getUserWatchListMovies(user.tmdb_accountIdV4),
        getUserWatchlistTvs(user.tmdb_accountIdV4),
        getUserRatedMovies(user.tmdb_accountIdV4),
        getUserRatedTvs(user.tmdb_accountIdV4),
      ]);
      setFavoriteMoviesIds(responses[0].results.map((movie) => movie.id));
      setFavoriteTvsIds(responses[1].results.map((tv) => tv.id));
      setWatchlistMoviesIds(responses[2].results.map((movie) => movie.id));
      setWatchlistTvsIds(responses[3].results.map((tv) => tv.id));
      setRatedMovies(responses[4].results);
      setRatedTvs(responses[5].results);
      setRatedMoviesIds(responses[4].results.map((movie) => movie.id));
      setRatedTvsIds(responses[5].results.map((tv) => tv.id));
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

  return {
    fetchUserDatas,
    favoriteMoviesIds,
    watchlistMoviesIds,
    favoriteTvsIds,
    watchlistTvsIds,
    ratedMovies,
    ratedTvs,
    ratedMoviesIds,
    ratedTvsIds,
    userLists,
  };
};
