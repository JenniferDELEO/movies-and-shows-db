"use client";

import { FC, Key } from "react";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { FaListUl, FaBookmark } from "react-icons/fa";
import { FaHeart, FaStar } from "react-icons/fa6";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { FaBan } from "react-icons/fa";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { InternalMovieUser } from "@/models/movies";
import { InternalTvShowAndUser } from "@/models/tvShows";

type Props = {
  item: {
    id: number;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
    character?: string;
  };
  type: "tvShow" | "movie" | "episode";
  favoriteMoviesIds: number[];
  favoriteTvShowsIds: number[];
  watchlistMoviesIds: number[];
  watchlistTvShowsIds: number[];
  ratedMoviesIds: number[];
  ratedTvShowsIds: number[];
  classNames?: {
    container: string;
    title: string;
    items: string;
    image: string;
    dropdownContainer: string;
  };
  userMovies: InternalMovieUser[];
  userTvShows: InternalTvShowAndUser[];
  // eslint-disable-next-line no-unused-vars
  handleClick: (item: Key) => Promise<void>;
};

const DropdownCard: FC<Props> = (props) => {
  const {
    item,
    type,
    favoriteMoviesIds,
    favoriteTvShowsIds,
    watchlistMoviesIds,
    watchlistTvShowsIds,
    ratedMoviesIds,
    ratedTvShowsIds,
    classNames,
    userMovies,
    userTvShows,
    handleClick,
  } = props;

  const internalUserMoviesIds = userMovies?.map((movie) => movie.movie.tmdb_id);
  const watchedMovies = userMovies?.filter(
    (movie) => movie.account_states.status === "watched",
  );
  const watchedMoviesIds = watchedMovies?.map((movie) => movie.movie.tmdb_id);

  const internalUserTvShowsIds = userTvShows?.map(
    (tvShow) => tvShow.tv_show.tmdb_id,
  );

  const dropdownItems = [
    {
      key: `addToList-${item.id}-${item.title || item.name}`,
      startContent: <FaListUl />,
      content: "Ajouter à une liste",
    },
    {
      key: `favorite-${item.id}`,
      startContent: (
        <FaHeart
          className={`${
            (item?.release_date && favoriteMoviesIds?.includes(item.id)) ||
            (item?.first_air_date && favoriteTvShowsIds?.includes(item.id))
              ? "text-red-600"
              : ""
          }`}
        />
      ),
      content: "Favoris",
    },
    {
      key: `watchlist-${item.id}`,
      startContent: (
        <FaBookmark
          className={`${
            (item?.release_date && watchlistMoviesIds?.includes(item.id)) ||
            (item?.first_air_date && watchlistTvShowsIds?.includes(item.id))
              ? "text-orange-600"
              : ""
          }`}
        />
      ),
      content: "Liste de suivi",
    },
    {
      key: `note-${item.id}-${item.title || item.name}`,
      startContent: (
        <FaStar
          className={`${
            (item?.release_date && ratedMoviesIds?.includes(item.id)) ||
            (item?.first_air_date && ratedTvShowsIds?.includes(item.id))
              ? "text-yellow-400"
              : ""
          }`}
        />
      ),
      content: "Votre note",
    },
  ];

  if (type === "movie") {
    if (internalUserMoviesIds.includes(item.id)) {
      dropdownItems.unshift({
        key: `delete-${item.id}-${item.title}`,
        startContent: <FaBan />,
        content: "Supprimer du compte",
      });
      if (watchedMoviesIds.includes(item.id)) {
        dropdownItems.unshift({
          key: `toWatch-${item.id}-${item.title}`,
          startContent: <MdOutlineCheckBoxOutlineBlank />,
          content: "Marquer comme à voir",
        });
      } else {
        dropdownItems.unshift({
          key: `watched-${item.id}-${item.title}`,
          startContent: <MdOutlineCheckBox />,
          content: "Marquer comme vu",
        });
      }
    } else {
      dropdownItems.unshift({
        key: `toWatch-${item.id}-${item.title}`,
        startContent: <MdOutlineCheckBoxOutlineBlank />,
        content: "Marquer comme à voir",
      });
      dropdownItems.unshift({
        key: `watched-${item.id}-${item.title}`,
        startContent: <MdOutlineCheckBox />,
        content: "Marquer comme vu",
      });
    }
  }

  if (type === "tvShow") {
    if (internalUserTvShowsIds.includes(item.id)) {
      dropdownItems.unshift({
        key: `delete-${item.id}-${item.name}`,
        startContent: <FaBan />,
        content: "Supprimer du compte",
      });
    } else {
      dropdownItems.unshift({
        key: `add-${item.id}-${item.name}`,
        startContent: <MdOutlineCheckBox />,
        content: "Ajouter la série",
      });
    }
  }

  return (
    <div className={classNames?.dropdownContainer}>
      <Dropdown classNames={{ content: "bg-primary border-primary" }}>
        <DropdownTrigger>
          <button>
            <HiDotsCircleHorizontal className="cursor-pointer rounded-full bg-black text-3xl hover:bg-white hover:text-secondary" />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with icons"
          onAction={(item) => handleClick(item)}
          items={dropdownItems}
        >
          {(item) => (
            <DropdownItem key={item.key} startContent={item.startContent}>
              {item.content}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownCard;
