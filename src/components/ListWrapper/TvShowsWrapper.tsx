"use client";
import { FC, useState } from "react";

import Filters from "@/components/Filters/Filters";
import Cards from "@/components/Cards/Cards";
import { TvShow } from "@/models/tvShows";
import OrderingSelect from "../Filters/OrderingSelect";
import { Watcher } from "@/models/watchers";
import { Button } from "@nextui-org/react";
import FiltersModal from "../Modals/FiltersModal";

type Props = {
  popularTvShows: TvShow[];
  genresTvShows: { id: number; name: string }[];
  providersTvShows: Watcher[];
};

const TvShowsWrapper: FC<Props> = (props) => {
  const { popularTvShows, genresTvShows, providersTvShows } = props;
  const [tvShowsList, setTvShowsList] = useState<TvShow[]>(popularTvShows);
  const [filters, setFilters] = useState<any[]>([]);
  const [openFilters, setOpenFilters] = useState<boolean>(false);

  return (
    <div>
      <div className="mx-4 mb-4 flex flex-row items-baseline justify-between">
        <h3 className="text-lg lg:text-xl">Liste des séries télévisées</h3>
        <div className="lg:hidden">
          <Button onClick={() => setOpenFilters((prev) => !prev)}>
            Filtres
          </Button>
        </div>
        <OrderingSelect />
      </div>
      <div className="hidden lg:flex lg:flex-row">
        <Filters
          filterType="tv"
          filters={filters}
          setFilters={setFilters}
          genres={genresTvShows}
          providers={providersTvShows}
        />
        <Cards items={tvShowsList} filterType="tv" genres={genresTvShows} />
      </div>
      <div className="lg:hidden">
        <FiltersModal
          modalIsOpen={openFilters}
          setModalIsOpen={setOpenFilters}
          filterType="tv"
          filters={filters}
          setFilters={setFilters}
          genres={genresTvShows}
          providers={providersTvShows}
        />
        <Cards items={tvShowsList} filterType="tv" genres={genresTvShows} />
      </div>
    </div>
  );
};

export default TvShowsWrapper;
