"use client";

import { FC, Key, useContext, useState } from "react";

import AddToListModal from "@/components/Modals/AddToListModal";
import RatingModal from "@/components/Modals/RatingModal";
import { toggleFavorite, toggleWatchlist } from "@/libs/api/user";
import { toggleUserDatas } from "@/libs/helpers/userDatas";
import { User } from "@/models/user";
import { List } from "@/models/lists";
import {
  Genre,
  InternalMovie,
  InternalMovieUser,
  Movie,
} from "@/models/movies";
import { TvShow } from "@/models/tvShows";
import DropdownCard from "@/components/AccountInteraction/DropdownCard";
import IconsInteraction from "./IconsInteraction";
import { Tooltip } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { getUserMovies } from "@/libs/sanity/api/movie";
import { InternalUserContext } from "@/context/internalUserContext";

type Props = {
  item: {
    id: number;
    genres?: Genre[];
    genre_ids?: number[];
    poster_path: string;
    overview: string;
    release_date?: string;
    title?: string;
    name?: string;
  };
  type: "tvshow" | "movie" | "episode";
  user: User;
  fetchUserDatas: () => Promise<void>;
  userLists: List[];
  episodeDetailsProps?: {
    episodeNumber: number;
    id: number;
    isRated: boolean;
    seasonNumber: number;
    tvShowId: number;
    userRatingApi: number;
  };
  listsPageProps?: {
    favoriteMoviesIds: number[];
    favoriteTvShowsIds: number[];
    watchlistMoviesIds: number[];
    watchlistTvShowsIds: number[];
    ratedMovies: Movie[];
    ratedTvShows: TvShow[];
    ratedMoviesIds: number[];
    ratedTvShowsIds: number[];
    classNames?: {
      container: string;
      title: string;
      items: string;
      image: string;
      dropdownContainer: string;
    };
    internalMovies?: InternalMovie[];
    genresMovies: Genre[];
    userMovies?: InternalMovieUser[];
    userMoviesId?: string;
  };
  mediaDetailsPageProps?: {
    isFavorite: boolean;
    isInWatchlist: boolean;
    isRated: boolean;
    userRatingApi: number;
    userMovies?: InternalMovieUser[];
    userMoviesId?: string;
    internalMovies?: InternalMovie[];
  };
};

const AccountInteraction: FC<Props> = (props) => {
  const {
    item,
    type,
    user,
    fetchUserDatas,
    userLists,

    episodeDetailsProps,
    listsPageProps,
    mediaDetailsPageProps,
  } = props;
  const [modalAddToListIsOpen, setModalAddToListIsOpen] =
    useState<boolean>(false);
  const [modalRateIsOpen, setModalRateIsOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [selectedItemId, setSelectedItemId] = useState<number>(0);
  const [moviesAccount, setMoviesAccount] = useState<InternalMovieUser[]>(
    listsPageProps?.userMovies || mediaDetailsPageProps?.userMovies || [],
  );

  const { internalUser } = useContext(InternalUserContext);

  const movieGenres =
    item?.genre_ids?.map((genreId) => {
      const genre = listsPageProps?.genresMovies?.find(
        (genre) => genre.id === genreId,
      );
      return genre?.name;
    }) ||
    item?.genres?.map((genre) => genre.name) ||
    [];

  const _movieId =
    listsPageProps?.internalMovies?.find((movie) => movie.tmdb_id === item.id)
      ?._id ||
    mediaDetailsPageProps?.internalMovies?.find(
      (movie) => movie.tmdb_id === item.id,
    )?._id;

  const handleClick = async (media: Key) => {
    const category = media.toString().split("-")[0];
    const id = media.toString().split("-")[1];
    setSelectedItemId(parseInt(id));

    if (user && internalUser && internalUser.user_id) {
      if (category === "watched" && type === "movie") {
        const responseAddMovie = await axios.post("/api/movies", {
          tmdbId: id,
          title: item.title,
          releaseDate: item.release_date,
          genres: movieGenres,
          posterPath: item.poster_path,
          overview: item.overview,
        });
        if (responseAddMovie.status === 200) {
          const responseAddStatus = await axios.post("/api/user-movies", {
            tmdbId: id,
            status: "watched",
          });
          if (responseAddStatus.status === 200)
            toast.success("Film marqué comme vu avec succès");
          const result = await getUserMovies(internalUser.user_id);
          setMoviesAccount(result.movies);
        }
      }

      if (category === "toWatch" && type === "movie") {
        const responseAddMovie = await axios.post("/api/movies", {
          tmdbId: id,
          title: item.title,
          releaseDate: item.release_date,
          genres: movieGenres,
          posterPath: item.poster_path,
          overview: item.overview,
        });
        if (responseAddMovie.status === 200) {
          const responseAddStatus = await axios.post("/api/user-movies", {
            tmdbId: id,
            status: "to_watch",
          });
          if (responseAddStatus.status === 200)
            toast.success("Film marqué comme à voir avec succès");
          const result = await getUserMovies(internalUser.user_id);
          setMoviesAccount(result.movies);
        }
      }

      if (category === "note") {
        const name = media.toString().split("-")[2];
        setModalTitle(`Mettre une note à ${name}`);
        setModalRateIsOpen(true);
      }

      if (listsPageProps) {
        if (category === "delete" && type === "movie") {
          const responseUserMovieAndStatus = await axios.post(
            `/api/user-movies/${listsPageProps.userMoviesId}`,
            { userMovieId: listsPageProps.userMoviesId, movieId: _movieId },
          );
          if (responseUserMovieAndStatus.status === 200) {
            const responseMovieAndUser = await axios.post(
              `/api/movies/${_movieId}`,
              {
                movieId: _movieId,
              },
            );

            if (responseMovieAndUser.status === 200) {
              toast.success("Film supprimé du compte avec succès");
              const result = await getUserMovies(internalUser.user_id);
              setMoviesAccount(result.movies);
            }
          }
        }

        if (category === "addToList") {
          const name = media.toString().split("-")[2];
          setModalTitle(`Ajouter ${name} à une liste`);
          setModalAddToListIsOpen(true);
        }

        if (
          category === "favorite" &&
          listsPageProps.favoriteMoviesIds &&
          listsPageProps.favoriteTvShowsIds
        ) {
          await toggleUserDatas(
            category,
            type,
            id,
            user,
            toggleFavorite,
            fetchUserDatas,
            listsPageProps.favoriteMoviesIds,
            listsPageProps.favoriteTvShowsIds,
          );
        }

        if (
          category === "watchlist" &&
          listsPageProps.watchlistMoviesIds &&
          listsPageProps.watchlistTvShowsIds
        ) {
          await toggleUserDatas(
            category,
            type,
            id,
            user,
            toggleWatchlist,
            fetchUserDatas,
            listsPageProps.watchlistMoviesIds,
            listsPageProps.watchlistTvShowsIds,
          );
        }
      }
      if (mediaDetailsPageProps) {
        if (category === "delete" && type === "movie") {
          const responseUserMovieAndStatus = await axios.post(
            `/api/user-movies/${mediaDetailsPageProps.userMoviesId}`,
            {
              userMovieId: mediaDetailsPageProps.userMoviesId,
              movieId: _movieId,
            },
          );
          if (responseUserMovieAndStatus.status === 200) {
            const responseMovieAndUser = await axios.post(
              `/api/movies/${_movieId}`,
              {
                movieId: _movieId,
              },
            );

            if (responseMovieAndUser.status === 200) {
              toast.success("Film supprimé du compte avec succès");
              const result = await getUserMovies(internalUser.user_id);
              setMoviesAccount(result.movies);
            }
          }
        }

        if (category === "addToList") {
          const name = media.toString().split("-")[2];
          setModalTitle(`Ajouter ${name} à une liste`);
          setModalAddToListIsOpen(true);
        }

        if (category === "favorite") {
          await toggleUserDatas(
            category,
            type,
            id,
            user,
            toggleFavorite,
            fetchUserDatas,
            undefined,
            undefined,
            mediaDetailsPageProps.isFavorite,
          );
        }

        if (category === "watchlist") {
          await toggleUserDatas(
            category,
            type,
            id,
            user,
            toggleWatchlist,
            fetchUserDatas,
            undefined,
            undefined,
            undefined,
            mediaDetailsPageProps.isInWatchlist,
          );
        }
      }
    }
  };

  return type !== "episode" ? (
    <>
      <AddToListModal
        modalIsOpen={modalAddToListIsOpen}
        setModalIsOpen={setModalAddToListIsOpen}
        itemId={selectedItemId}
        itemType={type}
        title={modalTitle}
        userLists={userLists}
      />
      <RatingModal
        modalIsOpen={modalRateIsOpen}
        setModalIsOpen={setModalRateIsOpen}
        ratedMovies={listsPageProps?.ratedMovies}
        ratedTvShows={listsPageProps?.ratedTvShows}
        fetchUserDatas={fetchUserDatas}
        itemId={selectedItemId}
        itemType={type}
        title={modalTitle}
        userRatingApi={mediaDetailsPageProps?.userRatingApi}
      />
      {listsPageProps && (
        <DropdownCard
          item={item}
          favoriteMoviesIds={listsPageProps.favoriteMoviesIds}
          favoriteTvShowsIds={listsPageProps.favoriteTvShowsIds}
          watchlistMoviesIds={listsPageProps.watchlistMoviesIds}
          watchlistTvShowsIds={listsPageProps.watchlistTvShowsIds}
          ratedMoviesIds={listsPageProps.ratedMoviesIds}
          ratedTvShowsIds={listsPageProps.ratedTvShowsIds}
          classNames={listsPageProps?.classNames}
          userMovies={moviesAccount}
          handleClick={handleClick}
        />
      )}
      {mediaDetailsPageProps && (
        <IconsInteraction
          item={item}
          handleClick={handleClick}
          isFavorite={mediaDetailsPageProps.isFavorite}
          isRated={mediaDetailsPageProps.isRated}
          isInWatchlist={mediaDetailsPageProps.isInWatchlist}
          userMovies={moviesAccount}
        />
      )}
    </>
  ) : (
    <>
      <RatingModal
        episodeNumber={episodeDetailsProps?.episodeNumber}
        modalIsOpen={modalRateIsOpen}
        setModalIsOpen={setModalRateIsOpen}
        fetchUserDatas={fetchUserDatas}
        itemId={episodeDetailsProps?.tvShowId || 0}
        itemType={type}
        seasonNumber={episodeDetailsProps?.seasonNumber}
        title={modalTitle}
        userRatingApi={episodeDetailsProps?.userRatingApi}
      />
      <Tooltip
        content={
          episodeDetailsProps?.isRated
            ? `Votre note : ${episodeDetailsProps?.userRatingApi / 2}`
            : "Mettre une note"
        }
        placement="bottom"
      >
        <button
          value={`note-${item.id}-${item.title}`}
          onClick={(e) => handleClick(e.currentTarget.value)}
          className="rounded-full bg-primary p-3"
        >
          <FaStar
            size={16}
            className={`${episodeDetailsProps?.isRated ? "text-yellow-400" : ""}`}
          />
        </button>
      </Tooltip>
    </>
  );
};

export default AccountInteraction;
