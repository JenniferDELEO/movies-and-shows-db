/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { FC, useContext, useEffect, useState } from "react";

import Banner from "@/components/Banner/Banner";
import { Movie } from "@/models/movies";
import { TvShow } from "@/models/tvShows";
import { UserContext } from "@/context/userContext";
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
import { List } from "@/models/lists";
import { getLists } from "@/libs/api/lists";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  homeProps?: {
    popularMovies: Movie[];
    topRatedMovies: Movie[];
    popularTvShows: TvShow[];
    topRatedTvShows: TvShow[];
  };
  personDetailProps?: {
    actingMovies: Movie[];
    runningMovies: Movie[];
    actingTvShows: TvShow[];
    runningTvShows: TvShow[];
  };
  movieCollectionProps?: {
    movies: Movie[];
    title: string;
  };
  movieDetailsProps?: {
    movies: Movie[];
    title: "Films similaires" | "Films recommandés";
    totalPages: number;
  };
  tvshowsDetailsProps?: {
    tvshows: TvShow[];
    title: "Séries TV similaires" | "Séries TV recommandées";
    totalPages: number;
  };
};

const BannerWrapper: FC<Props> = ({
  homeProps,
  personDetailProps,
  movieCollectionProps,
  movieDetailsProps,
  tvshowsDetailsProps,
}) => {
  const [favoriteMoviesIds, setFavoriteMoviesIds] = useState<number[]>([]);
  const [favoriteTvShowsIds, setFavoriteTvShowsIds] = useState<number[]>([]);

  const [watchlistMoviesIds, setWatchlistMoviesIds] = useState<number[]>([]);
  const [watchlistTvShowsIds, setWatchlistTvShowsIds] = useState<number[]>([]);

  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [ratedTvShows, setRatedTvShows] = useState<TvShow[]>([]);
  const [ratedMoviesIds, setRatedMoviesIds] = useState<number[]>([]);
  const [ratedTvShowsIds, setRatedTvShowsIds] = useState<number[]>([]);

  const [userLists, setUserLists] = useState<List[]>([]);

  const { user } = useContext(UserContext);
  const pathname = usePathname();
  const router = useRouter();

  async function fetchUserDatas() {
    if (user && user.accountIdV4) {
      const responses = await Promise.all([
        getUserFavoriteMovies(user.accountIdV4),
        getUserFavoriteTvShows(user.accountIdV4),
        getUserWatchListMovies(user.accountIdV4),
        getUserWatchlistTvShows(user.accountIdV4),
        getUserRatedMovies(user.accountIdV4),
        getUserRatedTvShows(user.accountIdV4),
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
    if (user && user.accountIdV4) {
      fetchUserDatas();
      getUserList();
    }
  }, [user]);

  const classNames = {
    container: "mx-auto w-full md:w-[80%] lg:w[90%] mb-20 pb-16",
    title: "pl-5 text-xl tracking-wide font-bold",
    items: "mx-auto pb-5 pt-10 sm:px-1 md:pl-4",
    image:
      "w-[185px] h-[278px] 2xl:w-[288px] min-h-auto 2xl:h-[400px] rounded-md mx-auto",
    dropdownContainer: "absolute right-2 top-2 z-10 ",
  };

  const classNamesMovieDetails = {
    ...classNames,
    container: "mx-auto w-full mb-20 pb-16",
  };

  if (homeProps) {
    return (
      <div className="size-full">
        <Banner
          items={homeProps.popularMovies}
          type="movie"
          user={user}
          fetchUserDatas={fetchUserDatas}
          favoriteMoviesIds={favoriteMoviesIds}
          watchlistMoviesIds={watchlistMoviesIds}
          favoriteTvShowsIds={favoriteTvShowsIds}
          watchlistTvShowsIds={watchlistTvShowsIds}
          ratedMovies={ratedMovies}
          ratedTvShows={ratedTvShows}
          ratedMoviesIds={ratedMoviesIds}
          ratedTvShowsIds={ratedTvShowsIds}
          classNames={classNames}
          title="Les 20 Films les plus populaires"
          userLists={userLists}
        />
        <Banner
          items={homeProps.topRatedMovies}
          type="movie"
          user={user}
          fetchUserDatas={fetchUserDatas}
          favoriteMoviesIds={favoriteMoviesIds}
          watchlistMoviesIds={watchlistMoviesIds}
          favoriteTvShowsIds={favoriteTvShowsIds}
          watchlistTvShowsIds={watchlistTvShowsIds}
          ratedMovies={ratedMovies}
          ratedTvShows={ratedTvShows}
          ratedMoviesIds={ratedMoviesIds}
          ratedTvShowsIds={ratedTvShowsIds}
          classNames={classNames}
          title="Les 20 Films les mieux notés"
          userLists={userLists}
        />
        <Banner
          items={homeProps.popularTvShows}
          type="tvshow"
          user={user}
          fetchUserDatas={fetchUserDatas}
          favoriteTvShowsIds={favoriteTvShowsIds}
          watchlistTvShowsIds={watchlistTvShowsIds}
          favoriteMoviesIds={favoriteMoviesIds}
          watchlistMoviesIds={watchlistMoviesIds}
          ratedMovies={ratedMovies}
          ratedTvShows={ratedTvShows}
          ratedMoviesIds={ratedMoviesIds}
          ratedTvShowsIds={ratedTvShowsIds}
          classNames={classNames}
          title="Les 20 Séries TV les plus populaires"
          userLists={userLists}
        />
        <Banner
          items={homeProps.topRatedTvShows}
          type="tvshow"
          user={user}
          fetchUserDatas={fetchUserDatas}
          favoriteTvShowsIds={favoriteTvShowsIds}
          watchlistTvShowsIds={watchlistTvShowsIds}
          favoriteMoviesIds={favoriteMoviesIds}
          watchlistMoviesIds={watchlistMoviesIds}
          ratedMovies={ratedMovies}
          ratedTvShows={ratedTvShows}
          ratedMoviesIds={ratedMoviesIds}
          ratedTvShowsIds={ratedTvShowsIds}
          classNames={classNames}
          title="Les 20 Séries TV les mieux notées"
          userLists={userLists}
        />
      </div>
    );
  }
  if (movieCollectionProps) {
    return (
      <Banner
        items={movieCollectionProps.movies.sort((a, b) =>
          a.release_date.localeCompare(b.release_date),
        )}
        type="movie"
        user={user}
        fetchUserDatas={fetchUserDatas}
        favoriteMoviesIds={favoriteMoviesIds}
        watchlistMoviesIds={watchlistMoviesIds}
        favoriteTvShowsIds={favoriteTvShowsIds}
        watchlistTvShowsIds={watchlistTvShowsIds}
        ratedMovies={ratedMovies}
        ratedTvShows={ratedTvShows}
        ratedMoviesIds={ratedMoviesIds}
        ratedTvShowsIds={ratedTvShowsIds}
        classNames={classNamesMovieDetails}
        title={movieCollectionProps.title}
        userLists={userLists}
      />
    );
  }
  if (movieDetailsProps) {
    return (
      <div className="mx-auto py-4 text-xl font-bold md:w-[90%]">
        {movieDetailsProps?.movies?.length > 0 && (
          <div className="relative mt-4 size-full">
            {movieDetailsProps.totalPages > 1 && (
              <div className="absolute right-0 top-0">
                <button
                  className="rounded-lg bg-primary p-3 text-base font-normal"
                  onClick={() =>
                    router.push(
                      `${pathname}/${movieDetailsProps.title === "Films similaires" ? "similars" : "recommendations"}/1`,
                    )
                  }
                >
                  Plus de {movieDetailsProps.title}
                </button>
              </div>
            )}
            <Banner
              items={movieDetailsProps.movies}
              type="movie"
              user={user}
              fetchUserDatas={fetchUserDatas}
              favoriteMoviesIds={favoriteMoviesIds}
              watchlistMoviesIds={watchlistMoviesIds}
              favoriteTvShowsIds={favoriteTvShowsIds}
              watchlistTvShowsIds={watchlistTvShowsIds}
              ratedMovies={ratedMovies}
              ratedTvShows={ratedTvShows}
              ratedMoviesIds={ratedMoviesIds}
              ratedTvShowsIds={ratedTvShowsIds}
              classNames={classNamesMovieDetails}
              title={`${movieDetailsProps.title} (${movieDetailsProps.movies.length})`}
              userLists={userLists}
            />
          </div>
        )}
      </div>
    );
  }
  if (personDetailProps) {
    return (
      <div>
        {personDetailProps.actingMovies.length > 0 && (
          <div className="mt-4">
            <Banner
              items={personDetailProps.actingMovies}
              type="movie"
              user={user}
              fetchUserDatas={fetchUserDatas}
              favoriteMoviesIds={favoriteMoviesIds}
              watchlistMoviesIds={watchlistMoviesIds}
              favoriteTvShowsIds={favoriteTvShowsIds}
              watchlistTvShowsIds={watchlistTvShowsIds}
              ratedMovies={ratedMovies}
              ratedTvShows={ratedTvShows}
              ratedMoviesIds={ratedMoviesIds}
              ratedTvShowsIds={ratedTvShowsIds}
              classNames={classNames}
              title={`Films (${personDetailProps.actingMovies.length})`}
              userLists={userLists}
            />
          </div>
        )}
        {personDetailProps.actingTvShows.length > 0 && (
          <div className="mt-4">
            <Banner
              items={personDetailProps.actingTvShows}
              type="tvshow"
              user={user}
              fetchUserDatas={fetchUserDatas}
              favoriteMoviesIds={favoriteMoviesIds}
              watchlistMoviesIds={watchlistMoviesIds}
              favoriteTvShowsIds={favoriteTvShowsIds}
              watchlistTvShowsIds={watchlistTvShowsIds}
              ratedMovies={ratedMovies}
              ratedTvShows={ratedTvShows}
              ratedMoviesIds={ratedMoviesIds}
              ratedTvShowsIds={ratedTvShowsIds}
              classNames={classNames}
              title={`Séries TV (${personDetailProps.actingTvShows.length})`}
              userLists={userLists}
            />
          </div>
        )}
        {personDetailProps.runningMovies.length > 0 && (
          <div className="mt-4">
            <Banner
              items={personDetailProps.runningMovies}
              type="movie"
              user={user}
              fetchUserDatas={fetchUserDatas}
              favoriteTvShowsIds={favoriteTvShowsIds}
              watchlistTvShowsIds={watchlistTvShowsIds}
              favoriteMoviesIds={favoriteMoviesIds}
              watchlistMoviesIds={watchlistMoviesIds}
              ratedMovies={ratedMovies}
              ratedTvShows={ratedTvShows}
              ratedMoviesIds={ratedMoviesIds}
              ratedTvShowsIds={ratedTvShowsIds}
              classNames={classNames}
              title={`Films réalisés (${personDetailProps.runningMovies.length})`}
              userLists={userLists}
            />
          </div>
        )}
        {personDetailProps.runningTvShows.length > 0 && (
          <div className="mt-4">
            <Banner
              items={personDetailProps.runningTvShows}
              type="tvshow"
              user={user}
              fetchUserDatas={fetchUserDatas}
              favoriteTvShowsIds={favoriteTvShowsIds}
              watchlistTvShowsIds={watchlistTvShowsIds}
              favoriteMoviesIds={favoriteMoviesIds}
              watchlistMoviesIds={watchlistMoviesIds}
              ratedMovies={ratedMovies}
              ratedTvShows={ratedTvShows}
              ratedMoviesIds={ratedMoviesIds}
              ratedTvShowsIds={ratedTvShowsIds}
              classNames={classNames}
              title={`Séries TV réalisées (${personDetailProps.runningTvShows.length})`}
              userLists={userLists}
            />
          </div>
        )}
      </div>
    );
  }

  if (tvshowsDetailsProps) {
    return (
      <div className="mx-auto py-4 text-xl font-bold md:w-[90%]">
        {tvshowsDetailsProps?.tvshows?.length > 0 && (
          <div className="relative mt-4 size-full">
            {tvshowsDetailsProps.totalPages > 1 && (
              <div className="absolute right-0 top-0">
                <button
                  className="rounded-lg bg-primary p-3 text-base font-normal"
                  onClick={() =>
                    router.push(
                      `${pathname}/${tvshowsDetailsProps.title === "Séries TV similaires" ? "similars" : "recommendations"}/1`,
                    )
                  }
                >
                  Plus de {tvshowsDetailsProps.title}
                </button>
              </div>
            )}

            <Banner
              items={tvshowsDetailsProps.tvshows}
              type="tvshow"
              user={user}
              fetchUserDatas={fetchUserDatas}
              favoriteMoviesIds={favoriteMoviesIds}
              watchlistMoviesIds={watchlistMoviesIds}
              favoriteTvShowsIds={favoriteTvShowsIds}
              watchlistTvShowsIds={watchlistTvShowsIds}
              ratedMovies={ratedMovies}
              ratedTvShows={ratedTvShows}
              ratedMoviesIds={ratedMoviesIds}
              ratedTvShowsIds={ratedTvShowsIds}
              classNames={classNamesMovieDetails}
              title={`${tvshowsDetailsProps.title} (${tvshowsDetailsProps.tvshows.length})`}
              userLists={userLists}
            />
          </div>
        )}
      </div>
    );
  }
};

export default BannerWrapper;
