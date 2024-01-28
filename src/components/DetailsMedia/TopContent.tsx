"use client";

import Image from "next/image";
import { FC } from "react";

import { AccountStates, Genre, Video, WatchProviderFr } from "@/models/movies";
import Infos from "@/components/DetailsMedia/Infos";
import { CreditsMovies, CreditsTvShows } from "@/models/people";

type Props = {
  backdropPath: string;
  genresMedia: Genre[];
  id: number;
  overview: string;
  posterPath: string;
  title: string;
  type: "tvshow" | "movie";
  voteAverage: number;

  accountStates?: AccountStates;
  creditsMovies?: CreditsMovies;
  creditsTvShows?: CreditsTvShows;
  episodeRunTime?: number[];
  isCollection?: boolean;
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  originalLanguage?: string;
  releaseDate?: string;
  runtime?: number;
  status?: string;
  tagline?: string;
  videos?: {
    id: number;
    results: Video[];
  };
  voteCount?: number;
  watchProvidersFr?: WatchProviderFr[];
};

const TopContent: FC<Props> = (props) => {
  const {
    backdropPath,
    genresMedia,
    id,
    overview,
    posterPath,
    title,
    type,
    voteAverage,

    accountStates,
    creditsMovies,
    creditsTvShows,
    episodeRunTime,
    isCollection,
    numberOfSeasons,
    numberOfEpisodes,
    originalLanguage,
    releaseDate,
    runtime,
    status,
    tagline,
    videos,
    voteCount,
    watchProvidersFr,
  } = props;

  return (
    <section className="size-full">
      {backdropPath && (
        <div
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/original${backdropPath})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            position: "absolute",
            top: 150,
            left: 0,
            height: "calc(100vw/2.222222)",
          }}
          className="relative md:hidden"
        >
          {posterPath && (
            <div
              style={{
                width: "calc(((100vw/2.222222) - 40px)/1.5)",
                minWidth: "calc(((100vw/2.222222) - 40px)/1.5)",
                height: "calc((100vw/2.222222) - 40px)",
                minHeight: "calc((100vw/2.222222) - 40px)",
              }}
              className="absolute left-5 top-5 z-10 overflow-hidden rounded-sm"
            >
              <Image
                alt={`poster-${title}`}
                src={
                  posterPath
                    ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${posterPath}`
                    : "/images/defaultImage.png"
                }
                width={0}
                height={0}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  minWidth: "100%",
                  minHeight: "100%",
                  borderWidth: 0,
                  outline: 0,
                }}
                sizes="100vw"
              />
            </div>
          )}
        </div>
      )}
      <div className="md:hidden">
        <div
          style={{
            marginTop: backdropPath ? "calc((100vw/2.222222) + 100px)" : 0,
          }}
        >
          <Infos
            accountStates={accountStates}
            creditsMovies={creditsMovies}
            creditsTvShows={creditsTvShows}
            episodeRunTime={episodeRunTime}
            genresMedia={genresMedia}
            id={id}
            isCollection={isCollection}
            numberOfEpisodes={numberOfEpisodes}
            numberOfSeasons={numberOfSeasons}
            originalLanguage={originalLanguage}
            overview={overview}
            releaseDate={releaseDate}
            runtime={runtime}
            status={status}
            tagline={tagline}
            title={title}
            type={type}
            videos={videos}
            voteAverage={voteAverage}
            voteCount={voteCount}
            watchProvidersFr={watchProvidersFr}
          />
        </div>
      </div>
      <div className="relative hidden size-full md:block">
        <div
          style={{
            backgroundImage: backdropPath
              ? `url(${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/original${backdropPath})`
              : "bg-primary/90",
            backgroundSize: "cover",
            backgroundPosition: "left calc((50vw - 170px) - 340px) top",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: "calc(100vw/1.35)",
            maxHeight: 650,
          }}
        >
          <div
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(31.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 10.5, 10.5, 0.84) 50%, rgba(31.5, 10.5, 10.5, 0.84) 100%)",
              width: "100%",
              height: "calc(100vw/1.35)",
              maxHeight: 650,
            }}
          >
            <div className="mx-auto flex size-full flex-row items-start justify-between md:w-[95%] lg:w-[90%] 2xl:w-[70%]">
              {posterPath && (
                <div
                  style={{
                    width: "300px",
                    minWidth: "300px",
                    height: "450px",
                    minHeight: "450px",
                  }}
                  className="relative my-auto overflow-hidden rounded-sm"
                >
                  <Image
                    alt={`poster-${title}`}
                    src={
                      posterPath
                        ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w500${posterPath}`
                        : "/images/defaultImage.png"
                    }
                    width={0}
                    height={0}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      minWidth: "100%",
                      minHeight: "100%",
                      borderWidth: 0,
                      outline: 0,
                    }}
                    sizes="100vw"
                  />
                  {watchProvidersFr && watchProvidersFr.length > 0 && (
                    <div className="absolute bottom-0 left-0 w-full">
                      <div className="flex flex-row flex-wrap items-center justify-center bg-primary/90">
                        <p className="mr-2 text-xs">
                          Justwatch - Disponible en streaming sur :
                        </p>
                        {watchProvidersFr.map((watchProvider) => (
                          <div
                            key={watchProvider.provider_id}
                            className="flex size-10 flex-row items-center justify-center"
                          >
                            <Image
                              alt={`logo-${watchProvider.provider_name}`}
                              src={
                                watchProvider.logo_path
                                  ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w500${watchProvider.logo_path}`
                                  : "/images/defaultImage.png"
                              }
                              width={0}
                              height={0}
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "block",
                                minWidth: "100%",
                                minHeight: "100%",
                                borderWidth: 0,
                                outline: 0,
                                borderRadius: 5,
                              }}
                              sizes="100vw"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <Infos
                accountStates={accountStates}
                creditsMovies={creditsMovies}
                creditsTvShows={creditsTvShows}
                episodeRunTime={episodeRunTime}
                genresMedia={genresMedia}
                id={id}
                isCollection={isCollection}
                numberOfEpisodes={numberOfEpisodes}
                numberOfSeasons={numberOfSeasons}
                originalLanguage={originalLanguage}
                overview={overview}
                releaseDate={releaseDate}
                runtime={runtime}
                status={status}
                tagline={tagline}
                title={title}
                type={type}
                videos={videos}
                voteAverage={voteAverage}
                voteCount={voteCount}
                watchProvidersFr={watchProvidersFr}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopContent;
