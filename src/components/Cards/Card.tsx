"use client";

import dayjs from "dayjs";
import { FC, useContext } from "react";
import { useRouter } from "next/navigation";
import "dayjs/locale/fr";
import updateLocale from "dayjs/plugin/updateLocale";

import StarRating from "@/components/StarRate/StarRating";
import { InternalTv, InternalTvAndUser, Tv } from "@/models/tvs";
import {
  Genre,
  InternalMovie,
  InternalMovieUser,
  Movie,
} from "@/models/movies";
import { UserContext } from "@/context/userContext";
import AccountInteraction from "../AccountInteraction/AccountInteraction";
import { List } from "@/models/lists";
import { useSession } from "next-auth/react";

dayjs.locale("fr");

dayjs.extend(updateLocale);

dayjs.updateLocale("fr", {
  monthsShort: [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Aout",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
});

type Props = {
  filterType: string;
  genres: Genre[];
  movie?: Movie;
  tv?: Tv;
  classNames?: {
    container: string;
    title: string;
    items: string;
    image: string;
    dropdownContainer: string;
  };
  fetchUserDatas: () => Promise<void>;
  favoriteMoviesIds: number[];
  favoriteTvsIds: number[];
  watchlistMoviesIds: number[];
  watchlistTvsIds: number[];
  ratedMovies: Movie[];
  ratedTvs: Tv[];
  ratedMoviesIds: number[];
  ratedTvsIds: number[];
  userLists: List[];
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalMovies?: InternalMovie[];
  userTvs?: InternalTvAndUser[];
  internalTvs?: InternalTv[];
};

const Card: FC<Props> = ({
  filterType,
  genres,
  movie,
  tv,
  classNames,
  fetchUserDatas,
  favoriteMoviesIds,
  favoriteTvsIds,
  watchlistMoviesIds,
  watchlistTvsIds,
  ratedMovies,
  ratedTvs,
  ratedMoviesIds,
  ratedTvsIds,
  userLists,
  userMovies,
  userMoviesId,
  internalMovies,
  userTvs,
  internalTvs,
}) => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const { status } = useSession();

  const overviewRest =
    movie?.overview?.split(" ")?.filter(Boolean) ||
    tv?.overview?.split(" ")?.filter(Boolean);
  const overviewShow = overviewRest?.splice(0, 30)?.join(" ");

  const title = movie?.title || tv?.name || "";
  const date = movie?.release_date || tv?.first_air_date;
  const voteAverage = movie?.vote_average || tv?.vote_average || 0;
  const voteCount = movie?.vote_count || tv?.vote_count || 0;

  const styleContainer =
    "mb-4 2xl:mb-0 flex max-h-[278px] mx-auto lg:mx-4 pr-4 bg-gray-900 rounded-md cursor-pointer";

  return (
    <div
      className={styleContainer}
      onClick={() =>
        router.push(
          `/${filterType === "movie" ? "movie" : "tv"}/${movie?.id || tv?.id}-${title?.toLowerCase().replace(/[\W_]+/g, "-")}`,
        )
      }
    >
      <picture>
        <img
          src={
            movie?.poster_path
              ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${movie.poster_path}`
              : tv?.poster_path
                ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${tv.poster_path}`
                : "/images/defaultImage.png"
          }
          alt={title ? title : "defaultImage"}
          width={0}
          height={0}
          sizes="100vw"
          className="my-auto h-[255px] min-h-[255px] w-[170px] min-w-[170px] rounded-md md:h-[278px] md:w-[185px]"
        />
      </picture>

      <div className="relative ml-2 w-full md:ml-4">
        <h3 className="py-1 text-sm md:pt-4 md:text-xl">{title}</h3>
        {movie && (
          <p className="text-xs text-gray-400 md:text-sm">
            {movie?.genre_ids.map((genreId, index) => {
              const genre = genres.find((genre) => genre.id === genreId);
              if (index === movie.genre_ids.length - 1) {
                return <span key={genreId}>{genre?.name}</span>;
              }
              return <span key={genreId}>{genre?.name}, </span>;
            })}
          </p>
        )}
        {tv && (
          <p className="text-xs text-gray-400 md:text-sm">
            {tv?.genre_ids.map((genreId, index) => {
              const genre = genres.find((genre) => genre.id === genreId);
              if (index === tv.genre_ids.length - 1) {
                return <span key={genreId}>{genre?.name}</span>;
              }
              return <span key={genreId}>{genre?.name}, </span>;
            })}
          </p>
        )}
        <div className="flex flex-row items-center justify-start pb-2">
          <p className="text-xs text-gray-400 md:text-sm">
            {date?.length ? dayjs(date).format("DD MMM. YYYY") : ""}
          </p>
          <div className={`flex items-center justify-between `}>
            <StarRating
              value={voteAverage / 2}
              count={5}
              size={14}
              isHalf={true}
              edit={false}
            />
            <span className="ml-1 text-xs text-gray-500">
              ({voteCount} vote{voteCount > 1 ? "s" : ""})
            </span>
          </div>
        </div>
        <p className="text-xs md:text-justify md:text-sm">
          {overviewShow}
          {overviewRest?.length ? "..." : ""}
        </p>
        {user &&
          user.tmdb_username &&
          status === "authenticated" &&
          userMovies &&
          userMoviesId &&
          internalMovies &&
          movie && (
            <div className="absolute -right-2 top-0 md:top-2">
              <AccountInteraction
                item={movie}
                type="movie"
                user={user}
                fetchUserDatas={fetchUserDatas}
                listsPageProps={{
                  favoriteMoviesIds,
                  favoriteTvsIds,
                  watchlistMoviesIds,
                  watchlistTvsIds,
                  ratedMovies,
                  ratedTvs,
                  ratedMoviesIds,
                  ratedTvsIds,
                  classNames,
                  internalMovies: internalMovies,
                  genresMovies: genres,
                  userMovies: userMovies,
                  userMoviesId: userMoviesId,
                }}
                userLists={userLists}
              />
            </div>
          )}
        {user &&
          user.tmdb_username &&
          status === "authenticated" &&
          tv &&
          userTvs &&
          internalTvs && (
            <div className="absolute -right-2 top-0 md:top-2">
              <AccountInteraction
                item={tv}
                type="tv"
                user={user}
                fetchUserDatas={fetchUserDatas}
                listsPageProps={{
                  favoriteMoviesIds,
                  favoriteTvsIds,
                  watchlistMoviesIds,
                  watchlistTvsIds,
                  ratedMovies,
                  ratedTvs,
                  ratedMoviesIds,
                  ratedTvsIds,
                  classNames,
                  genresTvs: genres,
                  userTvs,
                  internalTvs,
                }}
                userLists={userLists}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default Card;
