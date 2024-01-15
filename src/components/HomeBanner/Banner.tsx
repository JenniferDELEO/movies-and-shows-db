/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { FC, useContext, useEffect, useState } from "react";
import HomeBanner from "./HomeBanner";
import { Movie } from "@/models/movies";
import { TvShow } from "@/models/tvShows";
import { UserContext } from "@/context/userContext";
import {
  getUserFavoriteMovies,
  getUserWatchListMovies,
} from "@/libs/api/movies";
import {
  getUserFavoriteTvShows,
  getUserWatchlistTvShows,
} from "@/libs/api/tvshows";

type Props = {
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  popularTvShows: TvShow[];
  topRatedTvShows: TvShow[];
};

const Banner: FC<Props> = ({
  popularMovies,
  popularTvShows,
  topRatedMovies,
  topRatedTvShows,
}) => {
  const [favoriteMoviesIds, setFavoriteMoviesIds] = useState<number[]>([]);
  const [favoriteTvShowsIds, setFavoriteTvShowsIds] = useState<number[]>([]);

  const [watchlistMoviesIds, setWatchlistMoviesIds] = useState<number[]>([]);
  const [watchlistTvShowsIds, setWatchlistTvShowsIds] = useState<number[]>([]);

  const { user } = useContext(UserContext);

  async function fetchUserDatas() {
    if (user && user.accountIdV4) {
      const responses = await Promise.all([
        getUserFavoriteMovies(user.accountIdV4),
        getUserFavoriteTvShows(user.accountIdV4),
        getUserWatchListMovies(user.accountIdV4),
        getUserWatchlistTvShows(user.accountIdV4),
      ]);
      setFavoriteMoviesIds(responses[0].results.map((movie) => movie.id));
      setFavoriteTvShowsIds(responses[1].results.map((tv) => tv.id));
      setWatchlistMoviesIds(responses[2].results.map((movie) => movie.id));
      setWatchlistTvShowsIds(responses[3].results.map((tv) => tv.id));
    }
  }

  useEffect(() => {
    if (user && user.accountIdV4) {
      fetchUserDatas();
    }
  }, [user]);

  return (
    <div>
      <HomeBanner
        items={popularMovies}
        type="Films"
        filter="plus populaires"
        user={user}
        fetchUserDatas={fetchUserDatas}
        favoriteMoviesIds={favoriteMoviesIds}
        watchlistMoviesIds={watchlistMoviesIds}
      />
      <HomeBanner
        items={topRatedMovies}
        type="Films"
        filter="mieux notés"
        user={user}
        fetchUserDatas={fetchUserDatas}
        favoriteMoviesIds={favoriteMoviesIds}
        watchlistMoviesIds={watchlistMoviesIds}
      />
      <HomeBanner
        items={popularTvShows}
        type="Séries TV"
        filter="plus populaires"
        user={user}
        fetchUserDatas={fetchUserDatas}
        favoriteTvShowsIds={favoriteTvShowsIds}
        watchlistTvShowsIds={watchlistTvShowsIds}
      />
      <HomeBanner
        items={topRatedTvShows}
        type="Séries TV"
        filter="mieux notées"
        user={user}
        fetchUserDatas={fetchUserDatas}
        favoriteTvShowsIds={favoriteTvShowsIds}
        watchlistTvShowsIds={watchlistTvShowsIds}
      />
    </div>
  );
};

export default Banner;
