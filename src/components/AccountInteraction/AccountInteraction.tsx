"use client";

import { FC, Key, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Genre, InternalMovie, InternalMovieUser } from "@/models/movies";
import DropdownCard from "@/components/AccountInteraction/DropdownCard";
import IconsInteraction from "./IconsInteraction";
import { getUserMovies } from "@/libs/sanity/api/movie";
import { useSession } from "next-auth/react";

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
  listsPageProps?: {
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
    userMovies?: InternalMovieUser[];
    userMoviesId?: string;
    internalMovies?: InternalMovie[];
  };
};

const AccountInteraction: FC<Props> = (props) => {
  const {
    item,
    type,

    listsPageProps,
    mediaDetailsPageProps,
  } = props;
  const session = useSession();
  const [moviesAccount, setMoviesAccount] = useState<InternalMovieUser[]>(
    listsPageProps?.userMovies || mediaDetailsPageProps?.userMovies || [],
  );

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

    if (session && session.status === "authenticated") {
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
          const result = await getUserMovies(session.data.user.id);
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
          const result = await getUserMovies(session.data.user.id);
          setMoviesAccount(result.movies);
        }
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
              const result = await getUserMovies(session.data.user.id);
              setMoviesAccount(result.movies);
            }
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
            const responseMovieAndUser = await axios.post(
              `/api/movies/${_movieId}`,
              {
                movieId: _movieId,
              },
            );

            if (responseMovieAndUser.status === 200) {
              toast.success("Film supprimé du compte avec succès");
              const result = await getUserMovies(session.data.user.id);
              setMoviesAccount(result.movies);
            }
          }
        }
      }
    }
  };

  return type !== "episode" ? (
    <>
      {listsPageProps && (
        <DropdownCard
          item={item}
          classNames={listsPageProps?.classNames}
          userMovies={moviesAccount}
          handleClick={handleClick}
        />
      )}
      {mediaDetailsPageProps && (
        <IconsInteraction
          item={item}
          handleClick={handleClick}
          userMovies={moviesAccount}
        />
      )}
    </>
  ) : null;
};

export default AccountInteraction;
