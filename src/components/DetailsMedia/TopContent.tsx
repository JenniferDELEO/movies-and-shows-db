"use client";

import Image from "next/image";
import { FC } from "react";

import { AccountStates, Genre, Video } from "@/models/movies";
import Infos from "@/components/DetailsMedia/Infos";
import { CreditsMovies, CreditsTvShows } from "@/models/people";

type Props = {
  accountStates: AccountStates;
  backdropPath: string;
  genresMedia: Genre[];
  originalLanguage: string;
  overview: string;
  posterPath: string;
  tagline: string;
  title: string;
  type: "tvshow" | "movie";
  videos: {
    id: number;
    results: Video[];
  };
  voteAverage: number;
  voteCount: number;

  creditsMovies?: CreditsMovies;
  creditsTvShows?: CreditsTvShows;
  episodeRunTime?: number[];
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  releaseDate?: string;
  runtime?: number;
  status?: string;
};

const TopContent: FC<Props> = (props) => {
  const {
    accountStates,
    backdropPath,
    genresMedia,
    originalLanguage,
    overview,
    posterPath,
    tagline,
    title,
    type,
    videos,
    voteAverage,
    voteCount,

    creditsMovies,
    creditsTvShows,
    episodeRunTime,
    numberOfSeasons,
    numberOfEpisodes,
    releaseDate,
    runtime,
    status,
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
                src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${posterPath}`}
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
          />
        </div>
      </div>
      <div className="relative hidden size-full md:block">
        <div
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/original${backdropPath})`,
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
                  className="my-auto overflow-hidden rounded-sm"
                >
                  <Image
                    alt={`poster-${title}`}
                    src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w500${posterPath}`}
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
              <Infos
                accountStates={accountStates}
                creditsMovies={creditsMovies}
                creditsTvShows={creditsTvShows}
                episodeRunTime={episodeRunTime}
                genresMedia={genresMedia}
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
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopContent;
