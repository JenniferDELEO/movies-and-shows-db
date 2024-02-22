"use client";

import { FC, Key, useState } from "react";

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
import { InternalTv, InternalTvAndUser, Tv } from "@/models/tvs";
import DropdownCard from "@/components/AccountInteraction/DropdownCard";
import IconsInteraction from "./IconsInteraction";
import { Tooltip } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { getUserMovies } from "@/libs/sanity/api/movie";
import { getUserTvs } from "@/libs/sanity/api/tv";
import { useSession } from "next-auth/react";

type Props = {
  item: {
    id: number;
    genres?: Genre[];
    genre_ids?: number[];
    poster_path: string;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
  };
  type: "tv" | "movie" | "episode";
  user: User;
  fetchUserDatas: () => Promise<void>;
  userLists: List[];
  episodeDetailsProps?: {
    episodeNumber: number;
    id: number;
    isRated: boolean;
    seasonNumber: number;
    tvId: number;
    userRatingApi: number;
  };
  listsPageProps?: {
    favoriteMoviesIds: number[];
    favoriteTvsIds: number[];
    watchlistMoviesIds: number[];
    watchlistTvsIds: number[];
    ratedMovies: Movie[];
    ratedTvs: Tv[];
    ratedMoviesIds: number[];
    ratedTvsIds: number[];
    classNames?: {
      container: string;
      title: string;
      items: string;
      image: string;
      dropdownContainer: string;
    };
    internalMovies?: InternalMovie[];
    genresMovies?: Genre[];
    userMovies?: InternalMovieUser[];
    userMoviesId?: string;
    internalTvs?: InternalTv[];
    genresTvs?: Genre[];
    userTvs?: InternalTvAndUser[];
  };
  mediaDetailsPageProps?: {
    isFavorite: boolean;
    isInWatchlist: boolean;
    isRated: boolean;
    userRatingApi: number;
    userMovies?: InternalMovieUser[];
    userMoviesId?: string;
    internalMovies?: InternalMovie[];
    internalTvs?: InternalTv[];
    userTvs?: InternalTvAndUser[];
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
  const [tvsAccount, setTvsAccount] = useState<InternalTvAndUser[]>(
    listsPageProps?.userTvs || mediaDetailsPageProps?.userTvs || [],
  );

  const { data: session, status } = useSession();

  const movieGenres =
    item?.genre_ids?.map((genreId) => {
      const genre = listsPageProps?.genresMovies?.find(
        (genre) => genre.id === genreId,
      );
      return genre?.name;
    }) ||
    item?.genres?.map((genre) => genre.name) ||
    [];

  const tvGenres =
    item?.genre_ids?.map((genreId) => {
      const genre = listsPageProps?.genresTvs?.find(
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

  const _tvId =
    listsPageProps?.internalTvs?.find((tv) => tv.tmdb_id === item.id)?._id ||
    mediaDetailsPageProps?.internalTvs?.find((tv) => tv.tmdb_id === item.id)
      ?._id;

  const handleClick = async (media: Key) => {
    const category = media.toString().split("-")[0];
    const id = media.toString().split("-")[1];
    setSelectedItemId(parseInt(id));

    if (user && status === "authenticated") {
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
          const result = await getUserMovies(session.user.id);
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
          const result = await getUserMovies(session.user.id);
          setMoviesAccount(result.movies);
        }
      }

      /* if (category === "add" && type === "tv") {
        const responseAddTv = await axios.post("/api/tvs", {
          tmdbId: id,
          title: item.name,
          releaseDate: item.first_air_date,
          genres: tvGenres,
          posterPath: item.poster_path,
          overview: item.overview,
        });
        if (responseAddTv.status === 200) {
          const responseAddStatus = await axios.post("/api/user-tvs", {
            tmdbId: id,
            status: "active",
            watchState: "to_watch",
          });
          if (responseAddStatus.status === 200)
            toast.success("Série ajoutée avec succès");
          const result = await getUserTvs(session.user.id);
          const tvAdded = result.tvs.find((tv) => tv.tv.tmdb_id === Number(id));
          setTvsAccount(result.tvs);
          const responseAddSeasons = await axios.post("/api/tvs/seasons", {
            tvTmdbId: Number(id),
            tvId: tvAdded?.tv._id,
          });
        }
      } */

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
            toast.success("Film supprimé du compte avec succès");
            const result = await getUserMovies(session.user.id);
            setMoviesAccount(result.movies);
          }
        }

        /* if (category === "delete" && type === "tv") {
          const responseUserTvAndStatus = await axios.post(
            `/api/user-tvs/${listsPageProps.userTvsId}`,
            { userTvId: listsPageProps.userTvsId, tvId: _tvId },
          );
          if (responseUserTvAndStatus.status === 200) {
            toast.success("Série supprimée du compte avec succès");
            const result = await getUserTvs(session.user.id);
            setTvsAccount(result.tvs);
          }
        } */

        if (category === "addToList") {
          const name = media.toString().split("-")[2];
          setModalTitle(`Ajouter ${name} à une liste`);
          setModalAddToListIsOpen(true);
        }

        if (
          category === "favorite" &&
          listsPageProps.favoriteMoviesIds &&
          listsPageProps.favoriteTvsIds
        ) {
          await toggleUserDatas(
            category,
            type,
            id,
            user,
            toggleFavorite,
            fetchUserDatas,
            listsPageProps.favoriteMoviesIds,
            listsPageProps.favoriteTvsIds,
          );
        }

        if (
          category === "watchlist" &&
          listsPageProps.watchlistMoviesIds &&
          listsPageProps.watchlistTvsIds
        ) {
          await toggleUserDatas(
            category,
            type,
            id,
            user,
            toggleWatchlist,
            fetchUserDatas,
            listsPageProps.watchlistMoviesIds,
            listsPageProps.watchlistTvsIds,
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
            toast.success("Film supprimé du compte avec succès");
            const result = await getUserMovies(session.user.id);
            setMoviesAccount(result.movies);
          }
        }

        /* if (category === "delete" && type === "tv") {
          const responseUserTvAndStatus = await axios.post(
            `/api/user-tvs/${mediaDetailsPageProps.userTvsId}`,
            { userTvId: mediaDetailsPageProps.userTvsId, tvId: _tvId },
          );
          if (responseUserTvAndStatus.status === 200) {
            toast.success("Série supprimée du compte avec succès");
            const result = await getUserTvs(session.user.id);
            setTvsAccount(result.tvs);
          }
        } */

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
        ratedTvs={listsPageProps?.ratedTvs}
        fetchUserDatas={fetchUserDatas}
        itemId={selectedItemId}
        itemType={type}
        title={modalTitle}
        userRatingApi={mediaDetailsPageProps?.userRatingApi}
      />
      {listsPageProps && (
        <DropdownCard
          item={item}
          type={type}
          favoriteMoviesIds={listsPageProps.favoriteMoviesIds}
          favoriteTvsIds={listsPageProps.favoriteTvsIds}
          watchlistMoviesIds={listsPageProps.watchlistMoviesIds}
          watchlistTvsIds={listsPageProps.watchlistTvsIds}
          ratedMoviesIds={listsPageProps.ratedMoviesIds}
          ratedTvsIds={listsPageProps.ratedTvsIds}
          classNames={listsPageProps?.classNames}
          userMovies={moviesAccount}
          userTvs={tvsAccount}
          handleClick={handleClick}
        />
      )}
      {mediaDetailsPageProps && (
        <IconsInteraction
          item={item}
          type={type}
          handleClick={handleClick}
          isFavorite={mediaDetailsPageProps.isFavorite}
          isRated={mediaDetailsPageProps.isRated}
          isInWatchlist={mediaDetailsPageProps.isInWatchlist}
          userMovies={moviesAccount}
          userTvs={tvsAccount}
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
        itemId={episodeDetailsProps?.tvId || 0}
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
