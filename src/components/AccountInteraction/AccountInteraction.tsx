"use client";

import { FC, Key, useState } from "react";

import AddToListModal from "@/components/Modals/AddToListModal";
import RatingModal from "@/components/Modals/RatingModal";
import { toggleFavorite, toggleWatchlist } from "@/libs/api/user";
import { toggleUserDatas } from "@/libs/helpers/userDatas";
import { User } from "@/models/user";
import { List } from "@/models/lists";
import { InternalMovieResponse, Movie } from "@/models/movies";
import { TvShow } from "@/models/tvShows";
import DropdownCard from "@/components/AccountInteraction/DropdownCard";
import IconsInteraction from "./IconsInteraction";
import { Tooltip } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";

type Props = {
  item: {
    id: number;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
    character?: string;
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
    userMovies: InternalMovieResponse[];
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

    episodeDetailsProps,
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
          userMovies={homePageProps.userMovies}
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
          userRatingApi={mediaDetailsPageProps.userRatingApi}
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
