/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ModalComponent from "./ModalComponent";
import { User } from "@/models/user";
import { getUserRatedMovies } from "@/libs/api/movies";
import { getUserRatedTvShows } from "@/libs/api/tvshows";
import StarRating from "../StarRate/StarRating";

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
  const [ratedMoviesIds, setRatedMoviesIds] = useState<number[]>([]);
  const [ratedTvShowsIds, setRatedTvShowsIds] = useState<number[]>([]);
  const [userRate, setUserRate] = useState<number>(0);

  async function fetchUserDatas() {
    if (user && user.accountIdV4) {
      const responses = await Promise.all([
        getUserRatedMovies(user.accountIdV4),
        getUserRatedTvShows(user.accountIdV4),
      ]);
      setRatedMoviesIds(responses[0].results.map((movie) => movie.id));
      setRatedTvShowsIds(responses[1].results.map((tv) => tv.id));
    }
  }

  useEffect(() => {
    if (user && user.accountIdV4) {
      fetchUserDatas();
    }
  }, [user]);

  const router = useRouter();

  const onValidate = async () => {};

  const onClose = () => {
    setModalIsOpen(false);
  };

  return (
    <ModalComponent
      modalIsOpen={modalIsOpen}
      itemId={itemId}
      title={title}
      onValidate={onValidate}
      onClose={onClose}
    >
      <div>
        <StarRating userRate={userRate} setUserRate={setUserRate} />
      </div>
    </ModalComponent>
  );
};

export default RatingModal;
