/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import ModalComponent from "./ModalComponent";
import { User } from "@/models/user";
import {
  addRateMovie,
  deleteRateMovie,
  getUserRatedMovies,
} from "@/libs/api/movies";
import {
  addRateTvShow,
  deleteRateTvShow,
  getUserRatedTvShows,
} from "@/libs/api/tvshows";
import StarRating from "../StarRate/StarRating";
import { Movie } from "@/models/movies";
import { TvShow } from "@/models/tvShows";
import { Button, Tooltip } from "@nextui-org/react";
import { TiDelete } from "react-icons/ti";
import toast from "react-hot-toast";

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  itemId: number;
  itemType: "movie" | "tv";
  title: string;
  user: User;
};

const RatingModal: FC<Props> = ({
  modalIsOpen,
  setModalIsOpen,
  itemId,
  itemType,
  title,
  user,
}) => {
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [ratedTvShows, setRatedTvShows] = useState<TvShow[]>([]);
  const [userRate, setUserRate] = useState<number>(0);

  async function fetchUserDatas() {
    if (user && user.accountIdV4) {
      const responses = await Promise.all([
        getUserRatedMovies(user.accountIdV4),
        getUserRatedTvShows(user.accountIdV4),
      ]);
      setRatedMovies(responses[0].results);
      setRatedTvShows(responses[1].results);
    }
  }

  useEffect(() => {
    if (user && user.accountIdV4 && modalIsOpen) {
      fetchUserDatas();
    }
  }, [user, modalIsOpen]);

  useEffect(() => {
    if (itemType === "movie" && ratedMovies.length > 0) {
      const userRating = ratedMovies.find((movie) => movie.id === itemId);
      if (userRating) setUserRate(userRating.account_rating.value / 2);
    }
    if (itemType === "tv" && ratedTvShows.length > 0) {
      const userRating = ratedTvShows.find((tv) => tv.id === itemId);
      if (userRating) setUserRate(userRating.account_rating.value / 2);
    }
  }, [itemType, itemId, ratedMovies, ratedTvShows]);

  const onValidate = async () => {
    if (itemType === "movie" && userRate > 0) {
      const response = await addRateMovie(itemId, userRate * 2);
      if (response.success) {
        await fetchUserDatas();
        setModalIsOpen(false);
        setUserRate(0);
        toast.success("Note ajoutée avec succès !");
      } else toast.error("Une erreur est survenue");
    } else if (itemType === "tv" && userRate > 0) {
      const response = await addRateTvShow(itemId, userRate * 2);
      if (response.success) {
        setModalIsOpen(false);
        setUserRate(0);
        toast.success("Note ajoutée avec succès !");
      } else toast.error("Une erreur est survenue");
    } else {
      setUserRate(0);
      setModalIsOpen(false);
    }
  };

  const onDeleteRating = async () => {
    if (itemType === "movie") {
      const response = await deleteRateMovie(itemId);
      if (response.success) {
        setUserRate(0);
        toast.success("Note supprimée avec succès !");
      } else toast.error("Une erreur est survenue");
    }
    if (itemType === "tv") {
      const response = await deleteRateTvShow(itemId);
      if (response.success) {
        setUserRate(0);
        toast.success("Note supprimée avec succès !");
      } else toast.error("Une erreur est survenue");
    }
  };

  const onClose = () => {
    setModalIsOpen(false);
    setUserRate(0);
  };

  return (
    <ModalComponent
      modalIsOpen={modalIsOpen}
      title={title}
      onValidate={onValidate}
      onClose={onClose}
    >
      <div className="flex flex-row justify-center">
        <StarRating userRate={userRate} setUserRate={setUserRate} />
        <Tooltip content="Supprimer la note" placement="bottom">
          <Button
            isIconOnly
            variant="ghost"
            onClick={onDeleteRating}
            className="ml-4 border-none"
          >
            <TiDelete size={18} />
          </Button>
        </Tooltip>
      </div>
    </ModalComponent>
  );
};

export default RatingModal;
