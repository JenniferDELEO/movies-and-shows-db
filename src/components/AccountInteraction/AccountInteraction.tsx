"use client";

import { FC, Key, useState } from "react";

import { InternalTv, InternalTvAndUser } from "@/models/tvs";
import axios from "axios";
import toast from "react-hot-toast";

import { Genre, InternalMovie, InternalMovieUser } from "@/models/movies";
import DropdownCard from "@/components/AccountInteraction/DropdownCard";
import IconsInteraction from "./IconsInteraction";
import { getUserMovies } from "@/libs/sanity/api/movie";
import { getUserTvs } from "@/libs/sanity/api/tv";
import { useSession } from "next-auth/react";
import AddEpisodeStatusModal from "../Modals/AddEpisodeStatusModal";

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
  episodeDetailsProps?: {
    episodeNumber: number;
    id: number;
    isRated: boolean;
    seasonNumber: number;
    tvId: number;
    userRatingApi: number;
  };
  listsPageProps?: {
    classNames?: {
      container: string;
      title: string;
      items: string;
      image: string;
      dropdownContainer: string;
    };
    internalMovies?: InternalMovie[];
    userMovies?: InternalMovieUser[];
    userMoviesId?: string;
    internalTvs?: InternalTv[];
    userTvs?: InternalTvAndUser[];
  };
  mediaDetailsPageProps?: {
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

    listsPageProps,
    mediaDetailsPageProps,
  } = props;
  const [modalAddEpisodesStatus, setModalAddEpisodesStatus] =
    useState<boolean>(false);
  const [moviesAccount, setMoviesAccount] = useState<InternalMovieUser[]>(
    listsPageProps?.userMovies || mediaDetailsPageProps?.userMovies || [],
  );
  const [tvsAccount, setTvsAccount] = useState<InternalTvAndUser[]>(
    listsPageProps?.userTvs || mediaDetailsPageProps?.userTvs || [],
  );

  const { data: session, status } = useSession();

  const _movieId =
    listsPageProps?.internalMovies?.find((movie) => movie.tmdb_id === item.id)
      ?._id ||
    mediaDetailsPageProps?.internalMovies?.find(
      (movie) => movie.tmdb_id === item.id,
    )?._id;

  const tvFromDb =
    listsPageProps?.internalTvs?.find((tv) => tv.tmdb_id === item.id) ||
    mediaDetailsPageProps?.internalTvs?.find((tv) => tv.tmdb_id === item.id);
  const _tvId = tvFromDb?._id;

  const userTvId = tvsAccount?.find((tv) => tv.tv.tmdb_id === item.id)?._id;

  const handleClick = async (media: Key) => {
    const category = media.toString().split("-")[0];
    const id = media.toString().split("-")[1];

    if (session && status === "authenticated") {
      if (
        (category === "to_watch" || category === "watched") &&
        type === "movie"
      ) {
        const responseAddMovie = await axios.post("/api/movies", {
          tmdbId: Number(id),
        });
        if (responseAddMovie.status === 200) {
          const responseAddStatus = await axios.post("/api/user-movies", {
            tmdbId: Number(id),
            status: category,
          });
          if (responseAddStatus.status === 200)
            toast.success(
              category === "to_watch"
                ? "Film marqué comme à voir avec succès"
                : "Film marqué comme vu avec succès",
            );
          const result = await getUserMovies(session.user.id);
          setMoviesAccount(result.movies);
        }
      }

      if (category === "add" && type === "tv") {
        const responseAddTv = await axios.post("/api/tvs", {
          tmdbId: Number(id),
        });
        if (responseAddTv.status === 200) {
          const responseAddStatus = await axios.post("/api/user-tvs", {
            tmdbId: Number(id),
            status: "active",
            watchState: "to_watch",
          });
          if (responseAddStatus.status === 200)
            toast.success("Série ajoutée avec succès");
          const result = await getUserTvs(session.user.id);
          const tvAdded = result.find((tv) => tv.tv.tmdb_id === Number(id));
          setTvsAccount(result);
          const responseAddSeasons = await axios.post("/api/tvs/seasons", {
            tvTmdbId: Number(id),
            tvId: tvAdded?.tv._id,
          });
          if (responseAddSeasons.status === 200) {
            const responseAddSeasonStatus = await axios.post(
              "/api/user-tvs/seasons",
              {
                tvId: tvAdded?.tv._id,
              },
            );
            if (responseAddSeasonStatus.status === 200)
              setModalAddEpisodesStatus(true);
          }
        }
      }

      if (category === "episode") {
        setModalAddEpisodesStatus(true);
      }

      if (category === "delete" && type === "tv") {
        const responseUserTvAndStatus = await axios.post(
          `/api/user-tvs/${userTvId}`,
          { userTvId, tvId: _tvId },
        );
        if (responseUserTvAndStatus.status === 200) {
          toast.success("Série supprimée du compte avec succès");
          const result = await getUserTvs(session.user.id);
          setTvsAccount(result);
        }
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
      }
    }
  };

  return type !== "episode" ? (
    <>
      {_tvId && modalAddEpisodesStatus && (
        <AddEpisodeStatusModal
          modalIsOpen={modalAddEpisodesStatus}
          setModalIsOpen={setModalAddEpisodesStatus}
          tvFromDb={tvFromDb}
          tvId={_tvId}
          tvTmdbId={item.id}
        />
      )}
      {listsPageProps && (
        <DropdownCard
          item={item}
          type={type}
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
          userMovies={moviesAccount}
          userTvs={tvsAccount}
        />
      )}
    </>
  ) : null;
};

export default AccountInteraction;
