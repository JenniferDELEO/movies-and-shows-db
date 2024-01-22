"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import ModalComponent from "./ModalComponent";
import Filters from "../Filters/Filters";
import { Watcher } from "@/models/watchers";
import { Filters as FiltersType } from "@/models/filters";

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  filters: FiltersType;
  setFilters: Dispatch<SetStateAction<FiltersType>>;
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
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

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
        filters={filters}
        setFilters={setFilters}
        genres={genres}
        providers={providers}
        setIsFiltering={setIsFiltering}
      />
    </ModalComponent>
  );
};

export default FiltersModal;
