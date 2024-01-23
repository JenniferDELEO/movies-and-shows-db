"use client";

import { Dispatch, FC, SetStateAction } from "react";
import ModalComponent from "./ModalComponent";
import Filters from "../Filters/Filters";
import { Watcher } from "@/models/watchers";
import { MoviesFilters, TvShowsFilters } from "@/models/filters";

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  moviesFilters?: MoviesFilters;
  setMoviesFilters?: Dispatch<SetStateAction<MoviesFilters>>;
  tvshowsFilters?: TvShowsFilters;
  setTvShowsFilters?: Dispatch<SetStateAction<TvShowsFilters>>;
  genres: { id: number; name: string }[];
  providers: Watcher[];
  setIsFiltering: Dispatch<SetStateAction<boolean>>;
  handleFiltersSelection: () => Promise<void>;
  isResetting: boolean;
  setIsResetting: Dispatch<SetStateAction<boolean>>;
};

const FiltersModal: FC<Props> = (props) => {
  const {
    modalIsOpen,
    setModalIsOpen,
    moviesFilters,
    setMoviesFilters,
    tvshowsFilters,
    setTvShowsFilters,
    genres,
    providers,
    setIsFiltering,
    handleFiltersSelection,
    isResetting,
    setIsResetting,
  } = props;

  async function onValidate() {
    await handleFiltersSelection();
    setModalIsOpen(false);
  }

  const onClose = () => {
    setModalIsOpen(false);
  };

  return (
    <ModalComponent
      modalIsOpen={modalIsOpen}
      title="Sélection de Filtres"
      onValidate={onValidate}
      onClose={onClose}
    >
      <Filters
        moviesFilters={moviesFilters}
        setMoviesFilters={setMoviesFilters}
        tvshowsFilters={tvshowsFilters}
        setTvShowsFilters={setTvShowsFilters}
        genres={genres}
        providers={providers}
        setIsFiltering={setIsFiltering}
        isResetting={isResetting}
        setIsResetting={setIsResetting}
      />
    </ModalComponent>
  );
};

export default FiltersModal;
