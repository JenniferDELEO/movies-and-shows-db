"use client";

import { InternalMovieUser } from "@/models/movies";
import { InternalTvAndUser } from "@/models/tvs";
import { Tooltip } from "@nextui-org/react";
import { FC, Key } from "react";
import { FaListUl, FaBookmark, FaBan } from "react-icons/fa";
import { FaHeart, FaStar } from "react-icons/fa6";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

type Props = {
  item: {
    id: number;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
    character?: string;
  };
  type: "tv" | "movie" | "episode";
  // eslint-disable-next-line no-unused-vars
  handleClick: (item: Key) => Promise<void>;
  isFavorite: boolean;
  isInWatchlist: boolean;
  isRated: boolean;
  userMovies: InternalMovieUser[];
  userTvs: InternalTvAndUser[];
};

const IconsInteraction: FC<Props> = (props) => {
  const {
    item,
    type,
    handleClick,
    isFavorite,
    isInWatchlist,
    isRated,
    userMovies,
    userTvs,
  } = props;

  const internalUserMoviesIds = userMovies?.map((movie) => movie.movie.tmdb_id);
  const watchedMovies = userMovies?.filter(
    (movie) => movie.account_states.status === "watched",
  );
  const watchedMoviesIds = watchedMovies?.map((movie) => movie.movie.tmdb_id);

  const internalUserTvsIds = userTvs?.map((tv) => tv.tv.tmdb_id);

  const dropdownItems = [
    {
      key: `addToList-${item.id}-${item.title || item.name}`,
      startContent: <FaListUl />,
      content: "Ajouter à une liste",
    },
    {
      key: `favorite-${item.id}`,
      startContent: (
        <FaHeart className={`${isFavorite ? "text-red-600" : ""}`} />
      ),
      content: "Favoris",
    },
    {
      key: `watchlist-${item.id}`,
      startContent: (
        <FaBookmark className={`${isInWatchlist ? "text-orange-600" : ""}`} />
      ),
      content: "Liste de suivi",
    },
    {
      key: `note-${item.id}-${item.title || item.name}`,
      startContent: (
        <FaStar className={`${isRated ? "text-yellow-400" : ""}`} />
      ),
      content: "Votre note",
    },
  ];

  if (type === "movie") {
    if (internalUserMoviesIds.includes(item.id)) {
      dropdownItems.unshift({
        key: `delete-${item.id}-${item.title || item.name}`,
        startContent: <FaBan />,
        content: "Supprimer du compte",
      });
      if (watchedMoviesIds.includes(item.id)) {
        dropdownItems.unshift({
          key: `to_watch-${item.id}-${item.title || item.name}`,
          startContent: <MdOutlineCheckBoxOutlineBlank />,
          content: "Marquer comme à voir",
        });
      } else {
        dropdownItems.unshift({
          key: `watched-${item.id}-${item.title || item.name}`,
          startContent: <MdOutlineCheckBox />,
          content: "Marquer comme vu",
        });
      }
    } else {
      dropdownItems.unshift({
        key: `to_watch-${item.id}-${item.title || item.name}`,
        startContent: <MdOutlineCheckBoxOutlineBlank />,
        content: "Marquer comme à voir",
      });
      dropdownItems.unshift({
        key: `watched-${item.id}-${item.title || item.name}`,
        startContent: <MdOutlineCheckBox />,
        content: "Marquer comme vu",
      });
    }
  }

  if (type === "tv") {
    if (internalUserTvsIds.includes(item.id)) {
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
    <>
      {dropdownItems.map((dropdownItem) => (
        <Tooltip
          key={dropdownItem.key}
          content={dropdownItem.content}
          placement="bottom"
        >
          <button
            value={dropdownItem.key}
            onClick={(e) => handleClick(e.currentTarget.value)}
            className="mr-1 rounded-full bg-primary p-3 lg:mr-3"
          >
            {dropdownItem.startContent}
          </button>
        </Tooltip>
      ))}
    </>
  );
};

export default IconsInteraction;
