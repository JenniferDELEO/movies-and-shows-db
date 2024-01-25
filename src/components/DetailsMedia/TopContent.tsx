"use client";

import { Genre, Video } from "@/models/movies";
import Image from "next/image";
import { FC } from "react";
import Infos from "./Infos";
import { Credits } from "@/models/people";

type Props = {
  genres: Genre[];
  genresMedia?: Genre[];
  backdropPath?: string;
  posterPath?: string;
  title?: string;
  videos?: {
    id: number;
    results: Video[];
  };
  runtime?: number;
  credits?: Credits;
  releaseDate?: string;
  voteAverage?: number;
  voteCount?: number;
  tagline?: string;
  overview?: string;
  originalLanguage?: string;
};

const TopContent: FC<Props> = (props) => {
  const {
    genres,
    genresMedia,
    backdropPath,
    posterPath,
    title,
    videos,
    runtime,
    credits,
    releaseDate,
    voteAverage,
    voteCount,
    tagline,
    overview,
    originalLanguage,
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
            genres={genres}
            genresMedia={genresMedia}
            title={title}
            videos={videos}
            runtime={runtime}
            credits={credits}
            releaseDate={releaseDate}
            voteAverage={voteAverage}
            voteCount={voteCount}
            tagline={tagline}
            overview={overview}
            originalLanguage={originalLanguage}
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
                genres={genres}
                genresMedia={genresMedia}
                title={title}
                videos={videos}
                runtime={runtime}
                credits={credits}
                releaseDate={releaseDate}
                voteAverage={voteAverage}
                voteCount={voteCount}
                tagline={tagline}
                overview={overview}
                originalLanguage={originalLanguage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopContent;
