"use client";

import { FC, Key, useState } from "react";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { FaListUl } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import AddToListModal from "../Modals/AddToListModal";
import { toggleFavorite, toggleWatchlist } from "@/libs/api/user";
import { toggleUserDatas } from "@/libs/helpers/userDatas";
import RatingModal from "../Modals/RatingModal";
import { User } from "@/models/user";
import { List } from "@/models/lists";

type Props = {
  item: {
    id: number;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
    character?: string;
  };
  type: "Films" | "Séries TV";
  user: User;
  fetchUserDatas: () => Promise<void>;
  favoriteMoviesIds: number[];
  favoriteTvShowsIds: number[];
  watchlistMoviesIds: number[];
  watchlistTvShowsIds: number[];
  classNames: {
    container: string;
    title: string;
    items: string;
    image: string;
    dropdownContainer: string;
  };
  userLists: List[];
};

const DropdownCard: FC<Props> = (props) => {
  const {
    item,
    type,
    user,
    fetchUserDatas,
    favoriteMoviesIds,
    favoriteTvShowsIds,
    watchlistMoviesIds,
    watchlistTvShowsIds,
    classNames,
    userLists,
  } = props;
  const [modalAddToListIsOpen, setModalAddToListIsOpen] =
    useState<boolean>(false);
  const [modalRateIsOpen, setModalRateIsOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [selectedItemId, setSelectedItemId] = useState<number>(0);

  const handleClick = async (item: Key) => {
    const category = item.toString().split("-")[0];
    const id = item.toString().split("-")[1];
    setSelectedItemId(parseInt(id));

    if (user) {
      if (category === "addToList") {
        const name = item.toString().split("-")[2];
        setModalTitle(`Ajouter ${name} à une liste`);
        setModalAddToListIsOpen(true);
      }

      if (category === "favorite" && favoriteMoviesIds && favoriteTvShowsIds) {
        await toggleUserDatas(
          category,
          type,
          id,
          user,
          favoriteMoviesIds,
          favoriteTvShowsIds,
          toggleFavorite,
          fetchUserDatas,
        );
      }

      if (
        category === "watchlist" &&
        watchlistMoviesIds &&
        watchlistTvShowsIds
      ) {
        await toggleUserDatas(
          category,
          type,
          id,
          user,
          watchlistMoviesIds,
          watchlistTvShowsIds,
          toggleWatchlist,
          fetchUserDatas,
        );
      }
    }

    if (category === "note") {
      const name = item.toString().split("-")[2];
      setModalTitle(`Mettre une note à ${name}`);
      setModalRateIsOpen(true);
    }
  };

  return (
    <div>
      <AddToListModal
        modalIsOpen={modalAddToListIsOpen}
        setModalIsOpen={setModalAddToListIsOpen}
        itemId={selectedItemId}
        itemType={type === "Films" ? "movie" : "tv"}
        title={modalTitle}
        userLists={userLists}
      />
      <RatingModal
        modalIsOpen={modalRateIsOpen}
        setModalIsOpen={setModalRateIsOpen}
        itemId={selectedItemId}
        itemType={type === "Films" ? "movie" : "tv"}
        title={modalTitle}
        user={user}
      />
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
                (item?.release_date && watchlistMoviesIds?.includes(item.id)) ||
                (item?.first_air_date &&
                  watchlistTvShowsIds?.includes(item.id)) ? (
                  <MdCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )
              }
            >
              {(item?.release_date && watchlistMoviesIds?.includes(item.id)) ||
              (item?.first_air_date && watchlistTvShowsIds?.includes(item.id))
                ? "Vu"
                : "Non vu"}
            </DropdownItem>
            <DropdownItem
              key={`note-${item.id}-${item.title || item.name}`}
              startContent={<FaStar />}
            >
              Votre note
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default DropdownCard;
