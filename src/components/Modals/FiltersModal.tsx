"use client";

import { Dispatch, FC, SetStateAction } from "react";

import ModalComponent from "@/components/Modals/ModalComponent";
import Filters from "@/components/Filters/Filters";
import { Watcher } from "@/models/watchers";
import { MoviesFilters, TvShowsFilters } from "@/models/filters";

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  moviesFilters?: MoviesFilters;
  setMoviesFilters?: Dispatch<SetStateAction<MoviesFilters>>;
  tvShowsFilters?: TvShowsFilters;
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
    tvShowsFilters,
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
        tvShowsFilters={tvShowsFilters}
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
