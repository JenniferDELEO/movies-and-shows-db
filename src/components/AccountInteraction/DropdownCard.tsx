"use client";

import { FC, Key } from "react";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { FaListUl, FaBookmark } from "react-icons/fa";
import { FaHeart, FaStar } from "react-icons/fa6";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

type Props = {
  item: {
    id: number;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
    character?: string;
  };
  favoriteMoviesIds: number[];
  favoriteTvShowsIds: number[];
  watchlistMoviesIds: number[];
  watchlistTvShowsIds: number[];
  ratedMoviesIds: number[];
  ratedTvShowsIds: number[];
  classNames: {
    container: string;
    title: string;
    items: string;
    image: string;
    dropdownContainer: string;
  };
  handleClick: (item: Key) => Promise<void>;
};

const DropdownCard: FC<Props> = (props) => {
  const {
    item,
    favoriteMoviesIds,
    favoriteTvShowsIds,
    watchlistMoviesIds,
    watchlistTvShowsIds,
    ratedMoviesIds,
    ratedTvShowsIds,
    classNames,
    handleClick,
  } = props;

  return (
    <div className={classNames.dropdownContainer}>
      <Dropdown classNames={{ content: "bg-primary border-primary" }}>
        <DropdownTrigger>
          <button>
            <HiDotsCircleHorizontal className="cursor-pointer text-2xl hover:text-secondary" />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with icons"
          onAction={(item) => handleClick(item)}
        >
          <DropdownItem
            key={`addToList-${item.id}-${item.title || item.name}`}
            startContent={<FaListUl />}
          >
            Ajouter à une liste
          </DropdownItem>
          <DropdownItem
            key={`favorite-${item.id}`}
            startContent={
              <FaHeart
                className={`${(item?.release_date && favoriteMoviesIds?.includes(item.id)) || (item?.first_air_date && favoriteTvShowsIds?.includes(item.id)) ? "text-red-600" : ""}`}
              />
            }
          >
            Favoris
          </DropdownItem>
          <DropdownItem
            key={`watchlist-${item.id}`}
            startContent={
              <FaBookmark
                className={`${
                  (item?.release_date &&
                    watchlistMoviesIds?.includes(item.id)) ||
                  (item?.first_air_date &&
                    watchlistTvShowsIds?.includes(item.id))
                    ? "text-orange-600"
                    : ""
                }`}
              />
            }
          >
            Liste de suivi
          </DropdownItem>
          <DropdownItem
            key={`note-${item.id}-${item.title || item.name}`}
            startContent={
              <FaStar
                className={`${
                  (item?.release_date && ratedMoviesIds?.includes(item.id)) ||
                  (item?.first_air_date && ratedTvShowsIds?.includes(item.id))
                    ? "text-yellow-400"
                    : ""
                }`}
              />
            }
          >
            Votre note
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownCard;
