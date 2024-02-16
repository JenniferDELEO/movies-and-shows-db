"use client";

import { FC } from "react";
import { Tooltip } from "@nextui-org/react";

import {
  Genre,
  InternalMovie,
  InternalMovieUser,
  MovieDetails,
} from "@/models/movies";
import Infos from "@/components/DetailsMedia/Infos";
import {
  Episode,
  EpisodeDetails,
  InternalTv,
  InternalTvAndUser,
  TvDetails,
} from "@/models/tvs";
import { Collection } from "@/models/collections";

type Props = {
  movieDetails?: MovieDetails;
  tvDetails?: TvDetails;
  episodeDetails?: EpisodeDetails;
  collectionDetails?: Collection;
  genresCollection?: Genre[];
  voteAverageCollection?: number;
  type: "episode" | "movie" | "tv";
  episodePrecedent?: Episode | undefined;
  episodeNumber?: number;
  isCollection?: boolean;
  seasonNumber?: number;
  tvId?: number;
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalMovies?: InternalMovie[];
  internalTvs?: InternalTv[];
  userTvs?: InternalTvAndUser[];
  userTvsId?: string;
};

const TopContent: FC<Props> = (props) => {
  const {
    movieDetails,
    tvDetails,
    episodeDetails,
    collectionDetails,
    genresCollection,
    voteAverageCollection,
    type,
    episodePrecedent,
    episodeNumber,
    isCollection,
    seasonNumber,
    tvId,
    userMovies,
    userMoviesId,
    internalMovies,
    internalTvs,
    userTvs,
    userTvsId,
  } = props;

  const backgroundImage =
    movieDetails?.backdrop_path ||
    episodeDetails?.still_path ||
    tvDetails?.backdrop_path ||
    collectionDetails?.backdrop_path;
  const posterPath =
    movieDetails?.poster_path ||
    tvDetails?.poster_path ||
    collectionDetails?.poster_path;
  const watchProvidersFr =
    movieDetails?.watch_providers_fr || tvDetails?.watch_providers_fr;

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
            top:
              movieDetails?.backdrop_path || tvDetails?.backdrop_path
                ? 150
                : 250,
            left: 0,
            height: "calc(100vw/2.222222)",
          }}
          className="relative md:hidden"
        >
          {posterPath && type !== "episode" && (
            <div
              style={{
                width: "calc(((100vw/2.222222) - 40px)/1.5)",
                minWidth: "calc(((100vw/2.222222) - 40px)/1.5)",
                height: "calc((100vw/2.222222) - 40px)",
                minHeight: "calc((100vw/2.222222) - 40px)",
              }}
              className="absolute left-5 top-5 z-10 overflow-hidden rounded-sm"
            >
              <picture>
                <img
                  alt={`poster-${movieDetails?.title || tvDetails?.name || collectionDetails?.name}`}
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
              </picture>
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
            movieDetails={movieDetails}
            tvDetails={tvDetails}
            episodeDetails={episodeDetails}
            collectionDetails={collectionDetails}
            genresCollection={genresCollection}
            voteAverageCollection={voteAverageCollection}
            episodeNumber={episodeNumber}
            episodePrecedent={episodePrecedent}
            seasonNumber={seasonNumber}
            isCollection={isCollection}
            type={type}
            tvId={tvId}
            userMovies={userMovies}
            userMoviesId={userMoviesId}
            internalMovies={internalMovies}
            userTvs={userTvs}
            userTvsId={userTvsId}
            internalTvs={internalTvs}
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
                {posterPath && type !== "episode" && (
                  <div
                    style={{
                      width: "300px",
                      minWidth: "300px",
                      height: "450px",
                      minHeight: "450px",
                    }}
                    className="relative my-auto overflow-hidden rounded-sm"
                  >
                    <picture>
                      <img
                        alt={`poster-${movieDetails?.title || tvDetails?.name || collectionDetails?.name}`}
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
                    </picture>
                    {watchProvidersFr && watchProvidersFr.length > 0 && (
                      <div className="absolute bottom-0 left-0 w-full bg-primary/90">
                        <div className="flex flex-row flex-wrap items-center justify-center">
                          {watchProvidersFr.map((watchProvider) => (
                            <Tooltip
                              key={watchProvider.provider_id}
                              content={watchProvider.provider_name}
                              placement="bottom"
                            >
                              <div className="my-2 mr-2 size-10">
                                <picture>
                                  <img
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
                                </picture>
                              </div>
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {episodeDetails?.still_path && (
                  <div
                    style={{
                      width: "300px",
                      minWidth: "300px",
                      height: "168px",
                      minHeight: "168px",
                    }}
                    className="relative my-auto overflow-hidden rounded-sm"
                  >
                    <picture>
                      <img
                        alt={`poster-${episodeDetails?.name || ""}`}
                        src={
                          episodeDetails.still_path
                            ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w300${episodeDetails.still_path}`
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
                    </picture>
                  </div>
                )}
              </>
              <Infos
                movieDetails={movieDetails}
                tvDetails={tvDetails}
                episodeDetails={episodeDetails}
                collectionDetails={collectionDetails}
                genresCollection={genresCollection}
                voteAverageCollection={voteAverageCollection}
                episodeNumber={episodeNumber}
                episodePrecedent={episodePrecedent}
                isCollection={isCollection}
                seasonNumber={seasonNumber}
                type={type}
                tvId={tvId}
                userMovies={userMovies}
                userMoviesId={userMoviesId}
                internalMovies={internalMovies}
                userTvs={userTvs}
                userTvsId={userTvsId}
                internalTvs={internalTvs}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopContent;
