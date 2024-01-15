"use client";

import Image from "next/image";
import { FC, Key, useState } from "react";
import Slider from "react-slick";
import dayjs from "dayjs";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { FaListUl } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { settings } from "./reactSlickSettings";
import AddToListModal from "../Modals/AddToListModal";
import { toggleFavorite, toggleWatchlist } from "@/libs/api/user";
import { toggleUserDatas } from "@/libs/helpers/userDatas";
import RatingModal from "../Modals/RatingModal";
import { User } from "@/models/user";

type Props = {
  items: {
    id: number;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
  }[];
  type: "Films" | "Séries TV";
  filter: "plus populaires" | "mieux notés" | "mieux notées";
  user: User;
  fetchUserDatas: () => Promise<void>;
  favoriteMoviesIds?: number[];
  favoriteTvShowsIds?: number[];
  watchlistMoviesIds?: number[];
  watchlistTvShowsIds?: number[];
};

const HomeBanner: FC<Props> = ({
  items,
  type,
  filter,
  user,
  fetchUserDatas,
  favoriteMoviesIds,
  favoriteTvShowsIds,
  watchlistMoviesIds,
  watchlistTvShowsIds,
}) => {
  const [modalAddToListIsOpen, setModalAddToListIsOpen] =
    useState<boolean>(false);
  const [modalRateIsOpen, setModalRateIsOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [selectedItemId, setSelectedItemId] = useState<number>(0);

  const handleClick = async (item: Key) => {
    const category = item.toString().split("-")[0];
    const id = item.toString().split("-")[1];
    setSelectedItemId(parseInt(id));

    if (category === "addToList") {
      const name = item.toString().split("-")[2];
      setModalTitle(`Ajouter ${name} à une liste`);
      setModalAddToListIsOpen(true);
    }

    if (user) {
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

  if (!items) return <div>Chargement...</div>;

  return (
    <div className="mx-auto mb-20 size-full pb-16 md:w-4/5">
      <AddToListModal
        modalIsOpen={modalAddToListIsOpen}
        setModalIsOpen={setModalAddToListIsOpen}
        itemId={selectedItemId}
        itemType={type === "Films" ? "movie" : "tv"}
        title={modalTitle}
        user={user}
      />
      <RatingModal
        modalIsOpen={modalRateIsOpen}
        setModalIsOpen={setModalRateIsOpen}
        itemId={selectedItemId}
        itemType={type === "Films" ? "movie" : "tv"}
        title={modalTitle}
        user={user}
      />
      <h1 className="pl-5 text-xl tracking-wide sm:text-2xl md:text-3xl">
        Les 20 {type} les {filter}
      </h1>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="mx-auto pb-5 pt-10 sm:px-1 md:pl-4">
            <div className="relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w342${item.poster_path}`}
                alt={`${item?.title || item?.name} poster`}
                width={0}
                height={0}
                style={{
                  width: 342,
                  minHeight: "auto",
                  height: 513,
                  borderRadius: 5,
                }}
                className="mx-auto"
                sizes="100vw"
              />
              {user && user.username && (
                <div className="absolute right-16 top-4 z-10 sm:right-2 md:top-2 2xl:right-4">
                  <Dropdown
                    classNames={{ content: "bg-primary border-primary" }}
                  >
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
                            className={`${(item?.release_date && watchlistMoviesIds?.includes(item.id)) || (item?.first_air_date && watchlistTvShowsIds?.includes(item.id)) ? "text-secondary" : ""}`}
                          />
                        }
                      >
                        Liste de suivi
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
              )}
            </div>
            <div className="pl-14 sm:pl-0">
              <p className="mt-4 font-bold">{item?.title || item?.name}</p>
              <p className="mt-2 text-gray-400">
                {dayjs(item?.release_date).format("DD MMM. YYYY") ||
                  dayjs(item?.first_air_date).format("DD MMM. YYYY")}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeBanner;
