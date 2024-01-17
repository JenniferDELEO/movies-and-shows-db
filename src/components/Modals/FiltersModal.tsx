"use client";

import React, { Dispatch, FC, SetStateAction } from "react";
import ModalComponent from "./ModalComponent";
import Filters from "../Filters/Filters";
import { Watcher } from "@/models/watchers";

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  filters: any[];
  setFilters: Dispatch<SetStateAction<any[]>>;
  genres: { id: number; name: string }[];
  providers: Watcher[];
  filterType: "movie" | "tv";
};

const FiltersModal: FC<Props> = (props) => {
  const {
    modalIsOpen,
    setModalIsOpen,
    filters,
    setFilters,
    genres,
    providers,
    filterType,
  } = props;

  async function onValidate() {}

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
        filterType={filterType}
        filters={filters}
        setFilters={setFilters}
        genres={genres}
        providers={providers}
      />
    </ModalComponent>
  );
};

export default FiltersModal;
