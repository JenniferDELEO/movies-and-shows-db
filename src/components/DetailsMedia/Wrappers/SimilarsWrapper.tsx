/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  Genre,
  InternalMovie,
  InternalMovieUser,
  Movie,
} from "@/models/movies";
import { Tv } from "@/models/tvs";
import Card from "../../Cards/Card";
import Pagination from "../../Pagination/Pagination";
import { getSimilarsMovie } from "@/libs/api/movies";
import { getSimilarsTv } from "@/libs/api/tvs";

type Props = {
  mediaId: string;

  genresMovies?: Genre[];
  similarsMovies?: Movie[];
  totalPagesSimilarsMovies?: number;
  totalResultsSimilarsMovies?: number;
  genresTvs?: Genre[];
  similarsTvs?: Tv[];
  totalPagesSimilarsTvs?: number;
  totalResultsSimilarsTvs?: number;
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalMovies?: InternalMovie[];
};

const SimilarsWrapper: FC<Props> = (props) => {
  const {
    mediaId,

    genresMovies,
    similarsMovies,
    totalPagesSimilarsMovies,
    totalResultsSimilarsMovies,
    genresTvs,
    similarsTvs,
    totalPagesSimilarsTvs,
    totalResultsSimilarsTvs,
    userMovies,
    userMoviesId,
    internalMovies,
  } = props;
  const params = useParams();

  const [moviesList, setMoviesList] = useState<Movie[]>(similarsMovies || []);
  const [tvsList, setTvsList] = useState<Tv[]>(similarsTvs || []);
  const [totalPages, setTotalPages] = useState<number>(
    totalPagesSimilarsMovies || totalPagesSimilarsTvs || 0,
  );
  const [totalResults, setTotalResults] = useState<number>(
    totalResultsSimilarsMovies || totalResultsSimilarsTvs || 0,
  );
  const [currentPage, setCurrentPage] = useState<number>(Number(params.page));

  const genres = genresMovies || genresTvs || [];

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
    if (similarsTvs) {
      const { results, total_pages, total_results } = await getSimilarsTv(
        mediaId,
        currentPage,
      );
      setTvsList(results);
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
          userMovies &&
          userMoviesId &&
          internalMovies &&
          moviesList.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              filterType="movie"
              genres={genres}
              userMovies={userMovies}
              userMoviesId={userMoviesId}
              internalMovies={internalMovies}
            />
          ))}
        {similarsTvs &&
          tvsList.map((tv) => (
            <Card key={tv.id} tv={tv} filterType="tv" genres={genres} />
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
