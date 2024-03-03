/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { FC } from "react";
import { BsThreeDots } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { Tab, Tabs, Tooltip } from "@nextui-org/react";

import Banner from "@/components/Banner/Banner";
import { InternalMovie, InternalMovieUser, Movie } from "@/models/movies";
import { InternalTv, InternalTvAndUser, Tv } from "@/models/tvs";

type Props = {
  homeProps?: {
    popularMovies: Movie[];
    popularTvs: Tv[];
    topRatedMovies: Movie[];
    topRatedTvs: Tv[];
    trendingMoviesToday: Movie[];
    trendingMoviesThisWeek: Movie[];
    trendingTvsToday: Tv[];
    trendingTvsThisWeek: Tv[];
    internalMovies: InternalMovie[];
    userMovies: InternalMovieUser[];
    userMoviesId: string;
    internalTvs: InternalTv[];
    userTvs: InternalTvAndUser[];
  };
  personDetailProps?: {
    actingMovies: Movie[];
    actingTvs: Tv[];
    runningMovies: Movie[];
    runningTvs: Tv[];
    userMovies: InternalMovieUser[];
    userMoviesId: string;
    internalMovies: InternalMovie[];
    internalTvs: InternalTv[];
    userTvs: InternalTvAndUser[];
  };
  movieCollectionProps?: {
    movies: Movie[];
    title: string;
    userMovies: InternalMovieUser[];
    userMoviesId: string;
    internalMovies: InternalMovie[];
  };
  movieDetailsProps?: {
    movies: Movie[];
    title: "Films similaires" | "Films recommandés";
    totalPages: number;
    totalResults: number;
    userMovies: InternalMovieUser[];
    userMoviesId: string;
    internalMovies: InternalMovie[];
  };
  tvsDetailsProps?: {
    title: "Séries TV similaires" | "Séries TV recommandées";
    totalPages: number;
    totalResults: number;
    tvs: Tv[];
    userTvs: InternalTvAndUser[];
    internalTvs: InternalTv[];
  };
};

const BannerWrapper: FC<Props> = ({
  homeProps,
  personDetailProps,
  movieCollectionProps,
  movieDetailsProps,
  tvsDetailsProps,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const classNames = {
    container: "mx-auto w-full md:w-[80%] lg:w[90%] mb-20 pb-16",
    title: "pt-3 text-xl tracking-wide font-bold",
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
        <Tabs
          aria-label="Onglets Films"
          className="mx-4 md:mx-[10%]"
          variant="bordered"
        >
          <Tab
            title={
              <div className="my-2">
                <span className="text-sm">Aujourd&apos;hui</span>
              </div>
            }
          >
            <Banner
              items={homeProps.trendingMoviesToday}
              type="movie"
              classNames={classNames}
              title="Les 20 Films dans les tendances"
              internalMovies={homeProps.internalMovies}
              userMovies={homeProps.userMovies}
              userMoviesId={homeProps.userMoviesId}
            />
          </Tab>
          <Tab
            title={
              <div className="my-2">
                <span className="text-sm">Cette semaine</span>
              </div>
            }
          >
            <Banner
              items={homeProps.trendingMoviesThisWeek}
              type="movie"
              classNames={classNames}
              title="Les 20 Films dans les tendances"
              internalMovies={homeProps.internalMovies}
              userMovies={homeProps.userMovies}
              userMoviesId={homeProps.userMoviesId}
            />
          </Tab>
        </Tabs>
        <Banner
          items={homeProps.popularMovies}
          type="movie"
          classNames={classNames}
          title="Les 20 Films les plus populaires"
          internalMovies={homeProps.internalMovies}
          userMovies={homeProps.userMovies}
          userMoviesId={homeProps.userMoviesId}
        />
        <Banner
          items={homeProps.topRatedMovies}
          type="movie"
          classNames={classNames}
          title="Les 20 Films les mieux notés"
          internalMovies={homeProps.internalMovies}
          userMovies={homeProps.userMovies}
          userMoviesId={homeProps.userMoviesId}
        />
        <Tabs
          aria-label="Onglets Séries TV"
          className="mx-4 md:mx-[10%]"
          variant="bordered"
        >
          <Tab
            title={
              <div className="my-2">
                <span className="text-sm">Aujourd&apos;hui</span>
              </div>
            }
          >
            <Banner
              items={homeProps.trendingTvsToday}
              type="tv"
              classNames={classNames}
              title="Les 20 Séries TV dans les tendances"
              internalTvs={homeProps.internalTvs}
              userTvs={homeProps.userTvs}
            />
          </Tab>
          <Tab
            title={
              <div className="my-2">
                <span className="text-sm">Cette semaine</span>
              </div>
            }
          >
            <Banner
              items={homeProps.trendingTvsThisWeek}
              type="tv"
              classNames={classNames}
              title="Les 20 Séries TV dans les tendances"
              internalTvs={homeProps.internalTvs}
              userTvs={homeProps.userTvs}
            />
          </Tab>
        </Tabs>
        <Banner
          items={homeProps.popularTvs}
          type="tv"
          classNames={classNames}
          title="Les 20 Séries TV les plus populaires"
          internalTvs={homeProps.internalTvs}
          userTvs={homeProps.userTvs}
        />
        <Banner
          items={homeProps.topRatedTvs}
          type="tv"
          classNames={classNames}
          title="Les 20 Séries TV les mieux notées"
          internalTvs={homeProps.internalTvs}
          userTvs={homeProps.userTvs}
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
        classNames={classNamesPagesDetails}
        title={movieCollectionProps.title}
        internalMovies={movieCollectionProps.internalMovies}
        userMovies={movieCollectionProps.userMovies}
        userMoviesId={movieCollectionProps.userMoviesId}
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
              classNames={classNamesPagesDetails}
              title={`${movieDetailsProps.title} (${movieDetailsProps.totalResults})`}
              internalMovies={movieDetailsProps.internalMovies}
              userMovies={movieDetailsProps.userMovies}
              userMoviesId={movieDetailsProps.userMoviesId}
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
              classNames={classNamesPagesDetails}
              title={`Films (${personDetailProps.actingMovies.length})`}
              internalMovies={personDetailProps.internalMovies}
              userMovies={personDetailProps.userMovies}
              userMoviesId={personDetailProps.userMoviesId}
            />
            <div className="mx-auto my-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
          </div>
        )}
        {personDetailProps.actingTvs.length > 0 && (
          <div className="mt-4">
            <Banner
              items={personDetailProps.actingTvs.sort((a, b) =>
                b.first_air_date.localeCompare(a.first_air_date),
              )}
              type="tv"
              classNames={classNamesPagesDetails}
              title={`Séries TV (${personDetailProps.actingTvs.length})`}
              internalTvs={personDetailProps.internalTvs}
              userTvs={personDetailProps.userTvs}
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
              classNames={classNamesPagesDetails}
              title={`Films réalisés (${personDetailProps.runningMovies.length})`}
              internalMovies={personDetailProps.internalMovies}
              userMovies={personDetailProps.userMovies}
              userMoviesId={personDetailProps.userMoviesId}
            />
            <div className="mx-auto my-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
          </div>
        )}
        {personDetailProps.runningTvs.length > 0 && (
          <div className="mt-4">
            <Banner
              items={personDetailProps.runningTvs.sort((a, b) =>
                b.first_air_date.localeCompare(a.first_air_date),
              )}
              type="tv"
              classNames={classNamesPagesDetails}
              title={`Séries TV réalisées (${personDetailProps.runningTvs.length})`}
              internalTvs={personDetailProps.internalTvs}
              userTvs={personDetailProps.userTvs}
            />
            <div className="mx-auto my-10 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
          </div>
        )}
      </div>
    );
  }

  if (tvsDetailsProps) {
    return (
      <div className="mx-auto py-4 text-xl font-bold">
        {tvsDetailsProps?.tvs?.length > 0 && (
          <div className="relative mt-4 size-full">
            {tvsDetailsProps.totalPages > 1 && (
              <div className="absolute right-3 top-0">
                <Tooltip content="Voir plus" placement="top">
                  <button
                    className="rounded-full bg-white p-2 text-base font-normal text-primary"
                    onClick={() =>
                      router.push(
                        `${pathname}/${tvsDetailsProps.title === "Séries TV similaires" ? "similars" : "recommendations"}/1`,
                      )
                    }
                  >
                    <BsThreeDots />
                  </button>
                </Tooltip>
              </div>
            )}

            <Banner
              items={tvsDetailsProps.tvs}
              type="tv"
              classNames={classNamesPagesDetails}
              title={`${tvsDetailsProps.title} (${tvsDetailsProps.totalResults})`}
              internalTvs={tvsDetailsProps.internalTvs}
              userTvs={tvsDetailsProps.userTvs}
            />
          </div>
        )}
      </div>
    );
  }
};

export default BannerWrapper;
