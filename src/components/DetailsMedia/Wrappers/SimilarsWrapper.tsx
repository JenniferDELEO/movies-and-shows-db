/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Genre,
  InternalMovie,
  InternalMovieUser,
  Movie,
} from "@/models/movies";
import { TvShow } from "@/models/tvShows";
import React, { FC, useContext, useEffect, useState } from "react";
import Card from "../../Cards/Card";
import Pagination from "../../Pagination/Pagination";
import { useParams } from "next/navigation";
import {
  getSimilarsMovie,
  getUserFavoriteMovies,
  getUserRatedMovies,
  getUserWatchListMovies,
} from "@/libs/api/movies";
import {
  getSimilarsTvShow,
  getUserFavoriteTvShows,
  getUserRatedTvShows,
  getUserWatchlistTvShows,
} from "@/libs/api/tvshows";
import { UserContext } from "@/context/userContext";
import { List } from "@/models/lists";
import { getLists } from "@/libs/api/lists";

type Props = {
  mediaId: string;

  genresMovies?: Genre[];
  similarsMovies?: Movie[];
  totalPagesSimilarsMovies?: number;
  totalResultsSimilarsMovies?: number;
  genresTvShows?: Genre[];
  similarsTvShows?: TvShow[];
  totalPagesSimilarsTvShows?: number;
  totalResultsSimilarsTvShows?: number;
  userMovies: InternalMovieUser[];
  userMoviesId: string;
  internalMovies: InternalMovie[];
};

const SimilarsWrapper: FC<Props> = (props) => {
  const {
    mediaId,

    genresMovies,
    similarsMovies,
    totalPagesSimilarsMovies,
    totalResultsSimilarsMovies,
    genresTvShows,
    similarsTvShows,
    totalPagesSimilarsTvShows,
    totalResultsSimilarsTvShows,
    userMovies,
    userMoviesId,
    internalMovies,
  } = props;
  const params = useParams();

  const [moviesList, setMoviesList] = useState<Movie[]>(similarsMovies || []);
  const [tvShowsList, setTvShowsList] = useState<TvShow[]>(
    similarsTvShows || [],
  );
  const [totalPages, setTotalPages] = useState<number>(
    totalPagesSimilarsMovies || totalPagesSimilarsTvShows || 0,
  );
  const [totalResults, setTotalResults] = useState<number>(
    totalResultsSimilarsMovies || totalResultsSimilarsTvShows || 0,
  );
  const [currentPage, setCurrentPage] = useState<number>(Number(params.page));

  const genres = genresMovies || genresTvShows || [];

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

  async function getSimilarsNextPages() {
    if (similarsMovies) {
      const { results, total_pages, total_results } = await getSimilarsMovie(
        mediaId,
        currentPage,
      );
      setMoviesList(results);
      setTotalPages(total_pages);
      setTotalResults(total_results);
    }
    if (similarsTvShows) {
      const { results, total_pages, total_results } = await getSimilarsTvShow(
        mediaId,
        currentPage,
      );
      setTvShowsList(results);
      setTotalPages(total_pages);
      setTotalResults(total_results);
    }
  }

  useEffect(() => {
    if (currentPage > 1) {
      getSimilarsNextPages();
    }
  }, [currentPage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
      <h1 className="mx-auto mb-4 py-4 text-xl font-bold md:w-[90%] lg:px-4">
        {similarsMovies
          ? "Liste des films similaires"
          : "Liste des séries TV similaires"}{" "}
        <span className="font-normal">
          ({totalResults} résultat{totalResults > 1 ? "s" : ""})
        </span>
      </h1>
      <div className="mx-auto md:w-[90%] 2xl:grid 2xl:grid-cols-2 2xl:gap-4">
        {similarsMovies &&
          moviesList.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              filterType="movie"
              genres={genres}
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
        {similarsTvShows &&
          tvShowsList.map((tvShow) => (
            <Card
              key={tvShow.id}
              tvShow={tvShow}
              filterType="tvshow"
              genres={genres}
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
      <Pagination
        currentPage={currentPage}
        fromMediaDetails={true}
        scrollToTop={scrollToTop}
        setCurrentPage={setCurrentPage}
        total={totalPages || 0}
      />
    </section>
  );
};

export default SimilarsWrapper;
