/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { FC, useContext, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";

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
import { Tooltip } from "@nextui-org/react";

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
    totalResults: number;
  };
  tvshowsDetailsProps?: {
    tvshows: TvShow[];
    title: "Séries TV similaires" | "Séries TV recommandées";
    totalPages: number;
    totalResults: number;
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
    items: "mx-auto pt-10 sm:px-1 md:pl-4",
    image:
      "w-[185px] h-[278px] 2xl:w-[288px] min-h-auto 2xl:h-[400px] rounded-md mx-auto",
    dropdownContainer: "absolute right-2 top-2 z-10 ",
  };

  const classNamesPagesDetails = {
    ...classNames,
    container: "mx-auto w-full",
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
          b.release_date.localeCompare(a.release_date),
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
        classNames={classNamesPagesDetails}
        title={movieCollectionProps.title}
        userLists={userLists}
      />
    );
  }
  if (movieDetailsProps) {
    return (
      <div className="mx-auto py-4 text-xl font-bold">
        {movieDetailsProps?.movies?.length > 0 && (
          <div className="relative mt-4 size-full">
            {movieDetailsProps.totalPages > 1 && (
              <div className="absolute right-3 top-0">
                <Tooltip content="Voir plus" placement="top">
                  <button
                    className="rounded-full bg-white p-2 text-base font-normal text-primary"
                    onClick={() =>
                      router.push(
                        `${pathname}/${movieDetailsProps.title === "Films similaires" ? "similars" : "recommendations"}/1`,
                      )
                    }
                  >
                    <BsThreeDots />
                  </button>
                </Tooltip>
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
              classNames={classNamesPagesDetails}
              title={`${movieDetailsProps.title} (${movieDetailsProps.totalResults})`}
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
              items={personDetailProps.actingMovies.sort((a, b) =>
                b.release_date.localeCompare(a.release_date),
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
              classNames={classNamesPagesDetails}
              title={`Films (${personDetailProps.actingMovies.length})`}
              userLists={userLists}
            />
            <div className="mx-auto my-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
          </div>
        )}
        {personDetailProps.actingTvShows.length > 0 && (
          <div className="mt-4">
            <Banner
              items={personDetailProps.actingTvShows.sort((a, b) =>
                b.first_air_date.localeCompare(a.first_air_date),
              )}
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
              classNames={classNamesPagesDetails}
              title={`Séries TV (${personDetailProps.actingTvShows.length})`}
              userLists={userLists}
            />
            <div className="mx-auto my-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
          </div>
        )}
        {personDetailProps.runningMovies.length > 0 && (
          <div className="mt-4">
            <Banner
              items={personDetailProps.runningMovies.sort((a, b) =>
                b.release_date.localeCompare(a.release_date),
              )}
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
              classNames={classNamesPagesDetails}
              title={`Films réalisés (${personDetailProps.runningMovies.length})`}
              userLists={userLists}
            />
            <div className="mx-auto my-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
          </div>
        )}
        {personDetailProps.runningTvShows.length > 0 && (
          <div className="mt-4">
            <Banner
              items={personDetailProps.runningTvShows.sort((a, b) =>
                b.first_air_date.localeCompare(a.first_air_date),
              )}
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
              classNames={classNamesPagesDetails}
              title={`Séries TV réalisées (${personDetailProps.runningTvShows.length})`}
              userLists={userLists}
            />
            <div className="mx-auto my-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
          </div>
        )}
      </div>
    );
  }

  if (tvshowsDetailsProps) {
    return (
      <div className="mx-auto py-4 text-xl font-bold">
        {tvshowsDetailsProps?.tvshows?.length > 0 && (
          <div className="relative mt-4 size-full">
            {tvshowsDetailsProps.totalPages > 1 && (
              <div className="absolute right-3 top-0">
                <Tooltip content="Voir plus" placement="top">
                  <button
                    className="rounded-full bg-white p-2 text-base font-normal text-primary"
                    onClick={() =>
                      router.push(
                        `${pathname}/${tvshowsDetailsProps.title === "Séries TV similaires" ? "similars" : "recommendations"}/1`,
                      )
                    }
                  >
                    <BsThreeDots />
                  </button>
                </Tooltip>
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
              classNames={classNamesPagesDetails}
              title={`${tvshowsDetailsProps.title} (${tvshowsDetailsProps.totalResults})`}
              userLists={userLists}
            />
          </div>
        )}
      </div>
    );
  }
};

export default BannerWrapper;
