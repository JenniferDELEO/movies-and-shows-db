"use client";

import dayjs from "dayjs";
import { FC, useContext } from "react";
import { useRouter } from "next/navigation";
import "dayjs/locale/fr";
import updateLocale from "dayjs/plugin/updateLocale";

import StarRating from "@/components/StarRate/StarRating";
import { TvShow } from "@/models/tvShows";
import {
  Genre,
  InternalMovie,
  InternalMovieUser,
  Movie,
} from "@/models/movies";
import { UserContext } from "@/context/userContext";
import { InternalUserContext } from "@/context/internalUserContext";
import AccountInteraction from "../AccountInteraction/AccountInteraction";
import { List } from "@/models/lists";

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
  tvShow?: TvShow;
  classNames?: {
    container: string;
    title: string;
    items: string;
    image: string;
    dropdownContainer: string;
  };
  fetchUserDatas: () => Promise<void>;
  favoriteMoviesIds: number[];
  favoriteTvShowsIds: number[];
  watchlistMoviesIds: number[];
  watchlistTvShowsIds: number[];
  ratedMovies: Movie[];
  ratedTvShows: TvShow[];
  ratedMoviesIds: number[];
  ratedTvShowsIds: number[];
  userLists: List[];
  userMovies?: InternalMovieUser[];
  userMoviesId?: string;
  internalMovies?: InternalMovie[];
};

const Card: FC<Props> = ({
  filterType,
  genres,
  movie,
  tvShow,
  classNames,
  fetchUserDatas,
  favoriteMoviesIds,
  favoriteTvShowsIds,
  watchlistMoviesIds,
  watchlistTvShowsIds,
  ratedMovies,
  ratedTvShows,
  ratedMoviesIds,
  ratedTvShowsIds,
  userLists,
  userMovies,
  userMoviesId,
  internalMovies,
}) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { internalUser } = useContext(InternalUserContext);

  const overviewRest =
    movie?.overview?.split(" ")?.filter(Boolean) ||
    tvShow?.overview?.split(" ")?.filter(Boolean);
  const overviewShow = overviewRest?.splice(0, 30)?.join(" ");

  const title = movie?.title || tvShow?.name || "";
  const date = movie?.release_date || tvShow?.first_air_date;
  const voteAverage = movie?.vote_average || tvShow?.vote_average || 0;
  const voteCount = movie?.vote_count || tvShow?.vote_count || 0;

  const styleContainer =
    "mb-4 2xl:mb-0 flex max-h-[278px] mx-auto lg:mx-4 pr-4 bg-gray-900 rounded-md cursor-pointer";

  return (
    <div
      className={styleContainer}
      onClick={() =>
        router.push(
          `/${filterType === "movie" ? "movie" : "tvshow"}/${movie?.id || tvShow?.id}-${title?.toLowerCase().replace(/[\W_]+/g, "-")}`,
        )
      }
    >
      <picture>
        <img
          src={
            movie?.poster_path
              ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${movie.poster_path}`
              : tvShow?.poster_path
                ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${tvShow.poster_path}`
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
        {tvShow && (
          <p className="text-xs text-gray-400 md:text-sm">
            {tvShow?.genre_ids.map((genreId, index) => {
              const genre = genres.find((genre) => genre.id === genreId);
              if (index === tvShow.genre_ids.length - 1) {
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
          internalUser &&
          internalUser.user_id &&
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
                  favoriteTvShowsIds,
                  watchlistMoviesIds,
                  watchlistTvShowsIds,
                  ratedMovies,
                  ratedTvShows,
                  ratedMoviesIds,
                  ratedTvShowsIds,
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
          internalUser &&
          internalUser.user_id &&
          tvShow && (
            <div className="absolute -right-2 top-0 md:top-2">
              <AccountInteraction
                item={tvShow}
                type="tvshow"
                user={user}
                fetchUserDatas={fetchUserDatas}
                listsPageProps={{
                  favoriteMoviesIds,
                  favoriteTvShowsIds,
                  watchlistMoviesIds,
                  watchlistTvShowsIds,
                  ratedMovies,
                  ratedTvShows,
                  ratedMoviesIds,
                  ratedTvShowsIds,
                  classNames,
                  genresMovies: genres,
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
