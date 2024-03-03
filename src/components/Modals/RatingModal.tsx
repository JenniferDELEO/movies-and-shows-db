/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { TiDelete } from "react-icons/ti";
import toast from "react-hot-toast";

import ModalComponent from "@/components/Modals/ModalComponent";
import StarRating from "@/components/StarRate/StarRating";
import { Movie } from "@/models/movies";
import { TvShow } from "@/models/tvShows";

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  fetchUserDatas: () => Promise<void>;
  itemId: number;
  itemType: "movie" | "tvshow" | "episode";
  title: string;

  episodeNumber?: number;
  ratedMovies?: Movie[];
  ratedTvShows?: TvShow[];
  seasonNumber?: number;
  userRatingApi?: number;
};

const RatingModal: FC<Props> = ({
  episodeNumber,
  modalIsOpen,
  setModalIsOpen,
  ratedMovies,
  ratedTvShows,
  fetchUserDatas,
  itemId,
  itemType,
  seasonNumber,
  title,
  userRatingApi,
}) => {
  const [userRate, setUserRate] = useState<number>(0);

  const onValidate = async () => {
    /*  if (itemType === "movie" && userRate > 0) {
      const response = await addRateMovie(itemId, userRate * 2);
      if (response.success) {
        await fetchUserDatas();
        setModalIsOpen(false);
        setUserRate(0);
        toast.success("Note ajoutée avec succès !");
      } else toast.error("Une erreur est survenue");
    } else if (itemType === "tvshow" && userRate > 0) {
      const response = await addRateTvShow(itemId, userRate * 2);
      if (response.success) {
        await fetchUserDatas();
        setModalIsOpen(false);
        setUserRate(0);
        toast.success("Note ajoutée avec succès !");
      } else toast.error("Une erreur est survenue");
    } else if (
      itemType === "episode" &&
      userRate > 0 &&
      seasonNumber &&
      episodeNumber
    ) {
      const response = await addRateTvShowEpisode(
        itemId,
        seasonNumber,
        episodeNumber,
        userRate * 2,
      );
      if (response.success) {
        await fetchUserDatas();
        setModalIsOpen(false);
        setUserRate(0);
        toast.success("Note ajoutée avec succès !");
      } else toast.error("Une erreur est survenue");
    } else {
      setUserRate(0);
      setModalIsOpen(false);
    } */
  };

  const onDeleteRating = async () => {
    /* if (itemType === "movie") {
      const response = await deleteRateMovie(itemId);
      if (response.success) {
        await fetchUserDatas();
        setUserRate(0);
        toast.success("Note supprimée avec succès !");
      } else toast.error("Une erreur est survenue");
    }
    if (itemType === "tvshow") {
      const response = await deleteRateTvShow(itemId);
      if (response.success) {
        await fetchUserDatas();
        setUserRate(0);
        toast.success("Note supprimée avec succès !");
      } else toast.error("Une erreur est survenue");
    }
    if (itemType === "episode" && seasonNumber && episodeNumber) {
      const response = await deleteRateTvShowEpisode(
        itemId,
        seasonNumber,
        episodeNumber,
      );
      if (response.success) {
        await fetchUserDatas();
        setUserRate(0);
        toast.success("Note supprimée avec succès !");
      } else toast.error("Une erreur est survenue");
    } */
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
        <StarRating
          value={userRate}
          onChange={(value) => setUserRate(value)}
          count={5}
        />
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
