"use client";

import { FC, Key, useState } from "react";

import AddToListModal from "@/components/Modals/AddToListModal";
import RatingModal from "@/components/Modals/RatingModal";
import { toggleFavorite, toggleWatchlist } from "@/libs/api/user";
import { toggleUserDatas } from "@/libs/helpers/userDatas";
import { User } from "@/models/user";
import { List } from "@/models/lists";
import { Movie } from "@/models/movies";
import { TvShow } from "@/models/tvShows";
import DropdownCard from "@/components/AccountInteraction/DropdownCard";
import IconsInteraction from "./IconsInteraction";

type Props = {
  item: {
    id: number;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
    character?: string;
  };
  type: "tvshow" | "movie";
  user: User;
  fetchUserDatas: () => Promise<void>;
  userLists: List[];
  homePageProps?: {
    favoriteMoviesIds: number[];
    favoriteTvShowsIds: number[];
    watchlistMoviesIds: number[];
    watchlistTvShowsIds: number[];
    ratedMovies: Movie[];
    ratedTvShows: TvShow[];
    ratedMoviesIds: number[];
    ratedTvShowsIds: number[];
    classNames: {
      container: string;
      title: string;
      items: string;
      image: string;
      dropdownContainer: string;
    };
  };
  mediaDetailsPageProps?: {
    isFavorite: boolean;
    isInWatchlist: boolean;
    isRated: boolean;
    userRatingApi: number;
  };
};

const AccountInteraction: FC<Props> = (props) => {
  const {
    item,
    type,
    user,
    fetchUserDatas,
    userLists,
    homePageProps,
    mediaDetailsPageProps,
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
      if (homePageProps) {
        if (category === "addToList") {
          const name = item.toString().split("-")[2];
          setModalTitle(`Ajouter ${name} à une liste`);
          setModalAddToListIsOpen(true);
        }

        if (
          category === "favorite" &&
          homePageProps.favoriteMoviesIds &&
          homePageProps.favoriteTvShowsIds
        ) {
          await toggleUserDatas(
            category,
            type,
            id,
            user,
            toggleFavorite,
            fetchUserDatas,
            homePageProps.favoriteMoviesIds,
            homePageProps.favoriteTvShowsIds,
          );
        }

        if (
          category === "watchlist" &&
          homePageProps.watchlistMoviesIds &&
          homePageProps.watchlistTvShowsIds
        ) {
          await toggleUserDatas(
            category,
            type,
            id,
            user,
            toggleWatchlist,
            fetchUserDatas,
            homePageProps.watchlistMoviesIds,
            homePageProps.watchlistTvShowsIds,
          );
        }
      }
      if (mediaDetailsPageProps) {
        if (category === "addToList") {
          const name = item.toString().split("-")[2];
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

    if (category === "note") {
      const name = item.toString().split("-")[2];
      setModalTitle(`Mettre une note à ${name}`);
      setModalRateIsOpen(true);
    }
  };

  return (
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
        ratedMovies={homePageProps?.ratedMovies}
        ratedTvShows={homePageProps?.ratedTvShows}
        fetchUserDatas={fetchUserDatas}
        itemId={selectedItemId}
        itemType={type}
        title={modalTitle}
        userRatingApi={mediaDetailsPageProps?.userRatingApi}
      />
      {homePageProps && (
        <DropdownCard
          item={item}
          favoriteMoviesIds={homePageProps.favoriteMoviesIds}
          favoriteTvShowsIds={homePageProps.favoriteTvShowsIds}
          watchlistMoviesIds={homePageProps.watchlistMoviesIds}
          watchlistTvShowsIds={homePageProps.watchlistTvShowsIds}
          ratedMoviesIds={homePageProps.ratedMoviesIds}
          ratedTvShowsIds={homePageProps.ratedTvShowsIds}
          classNames={homePageProps.classNames}
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
        />
      )}
    </>
  );
};

export default AccountInteraction;
