"use client";

import Image from "next/image";
import { FC } from "react";

import { AccountStates, Genre, Video, WatchProviderFr } from "@/models/movies";
import Infos from "@/components/DetailsMedia/Infos";
import { CreditsMovies, CreditsTvShows } from "@/models/people";
import { Tooltip } from "@nextui-org/react";
import { Episode, EpisodeToAir } from "@/models/tvShows";

type Props = {
  genresMedia: Genre[];
  id: number;
  overview: string;
  title: string;
  type: "episode" | "movie" | "tvshow";
  voteAverage: number;

  accountStates?: AccountStates;
  backdropPath?: string;
  creditsMovies?: CreditsMovies;
  creditsTvShows?: CreditsTvShows;
  episodeAccountStates?: { id: number; rated: boolean | { value: number } };
  episodePrecedent?: Episode | undefined;
  episodeNumber?: number;
  episodeRunTime?: number[];
  isCollection?: boolean;
  nextEpisodeToAir?: EpisodeToAir | null;
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  originalLanguage?: string;
  posterPath?: string;
  releaseDate?: string;
  runtime?: number;
  seasonNumber?: number;
  status?: string;
  stillPath?: string;
  tagline?: string;
  tvShowId?: number;
  videos?: {
    id: number;
    results: Video[];
  };
  voteCount?: number;
  watchProvidersFr?: WatchProviderFr[];
};

const TopContent: FC<Props> = (props) => {
  const {
    genresMedia,
    id,
    overview,
    title,
    type,
    voteAverage,

    accountStates,
    backdropPath,
    creditsMovies,
    creditsTvShows,
    episodeAccountStates,
    episodePrecedent,
    episodeNumber,
    episodeRunTime,
    isCollection,
    nextEpisodeToAir,
    numberOfSeasons,
    numberOfEpisodes,
    originalLanguage,
    posterPath,
    releaseDate,
    runtime,
    seasonNumber,
    status,
    stillPath,
    tagline,
    tvShowId,
    videos,
    voteCount,
    watchProvidersFr,
  } = props;

  const backgroundImage = backdropPath || stillPath;

  return (
    <section className="size-full">
      {backgroundImage && (
        <div
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/original${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            position: "absolute",
            top: backdropPath ? 150 : 250,
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
            marginTop: backgroundImage ? "calc((100vw/2.222222) + 100px)" : 0,
          }}
        >
          <Infos
            accountStates={accountStates}
            creditsMovies={creditsMovies}
            creditsTvShows={creditsTvShows}
            episodeAccountStates={episodeAccountStates}
            episodeNumber={episodeNumber}
            episodePrecedent={episodePrecedent}
            episodeRunTime={episodeRunTime}
            genresMedia={genresMedia}
            id={id}
            isCollection={isCollection}
            nextEpisodeToAir={nextEpisodeToAir}
            numberOfEpisodes={numberOfEpisodes}
            numberOfSeasons={numberOfSeasons}
            originalLanguage={originalLanguage}
            overview={overview}
            releaseDate={releaseDate}
            runtime={runtime}
            seasonNumber={seasonNumber}
            status={status}
            tagline={tagline}
            title={title}
            type={type}
            tvShowId={tvShowId}
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
            backgroundImage: backgroundImage
              ? `url(${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/original${backgroundImage})`
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
              <>
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
                        <div className="flex flex-col items-center justify-center bg-primary/90 py-3">
                          <p className="mr-2 text-xs">
                            Justwatch - Disponible en streaming sur :
                          </p>
                          <div className="flex flex-row flex-wrap">
                            {watchProvidersFr.map((watchProvider) => (
                              <Tooltip
                                key={watchProvider.provider_id}
                                content={watchProvider.provider_name}
                                placement="bottom"
                              >
                                <div className="my-2 mr-2 size-10">
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
                              </Tooltip>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {stillPath && (
                  <div
                    style={{
                      width: "300px",
                      minWidth: "300px",
                      height: "168px",
                      minHeight: "168px",
                    }}
                    className="relative my-auto overflow-hidden rounded-sm"
                  >
                    <Image
                      alt={`poster-${title}`}
                      src={
                        stillPath
                          ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w300${stillPath}`
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
              </>
              <Infos
                accountStates={accountStates}
                creditsMovies={creditsMovies}
                creditsTvShows={creditsTvShows}
                episodeAccountStates={episodeAccountStates}
                episodeNumber={episodeNumber}
                episodePrecedent={episodePrecedent}
                episodeRunTime={episodeRunTime}
                genresMedia={genresMedia}
                id={id}
                isCollection={isCollection}
                nextEpisodeToAir={nextEpisodeToAir}
                numberOfEpisodes={numberOfEpisodes}
                numberOfSeasons={numberOfSeasons}
                originalLanguage={originalLanguage}
                overview={overview}
                releaseDate={releaseDate}
                runtime={runtime}
                seasonNumber={seasonNumber}
                status={status}
                tagline={tagline}
                title={title}
                type={type}
                tvShowId={tvShowId}
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
