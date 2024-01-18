/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FC, useEffect, useState } from "react";

import Filters from "@/components/Filters/Filters";
import Cards from "@/components/Cards/Cards";
import { TvShow } from "@/models/tvShows";
import OrderingSelect from "../Filters/OrderingSelect";
import { Watcher } from "@/models/watchers";
import { Button } from "@nextui-org/react";
import FiltersModal from "../Modals/FiltersModal";
import Pagination from "../Pagination/Pagination";
import { usePathname } from "next/navigation";
import { getDiscoverTvShows } from "@/libs/api/tvshows";
import { defaultFilters } from "@/libs/helpers/filters";

type Props = {
  tvShows: TvShow[];
  genresTvShows: { id: number; name: string }[];
  providersTvShows: Watcher[];
  totalPagesTvShows: number;
  totalResultsTvShows: number;
};

const TvShowsWrapper: FC<Props> = (props) => {
  const {
    tvShows,
    genresTvShows,
    providersTvShows,
    totalPagesTvShows,
    totalResultsTvShows,
  } = props;
  const pathname = usePathname();
  const [tvShowsList, setTvShowsList] = useState<TvShow[]>(tvShows);
  const [filters, setFilters] = useState<any[]>([]);
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(totalResultsTvShows);
  const [totalPages, setTotalPages] = useState<number>(totalPagesTvShows);
  const [currentPage, setCurrentPage] = useState(
    pathname.split("/")[2] ? parseInt(pathname.split("/")[2]) : 1,
  );

  async function getTvShowsNextPages() {
    const result = await getDiscoverTvShows({
      ...defaultFilters,
      page: currentPage,
    });
    setTvShowsList(result.results);
  }

  useEffect(() => {
    if (currentPage > 1) {
      getTvShowsNextPages();
    }
  }, [currentPage]);

  return (
    <div>
      <div className="mx-4 mb-4 flex flex-row items-baseline justify-between">
        <h3 className="text-lg lg:text-xl">
          Liste des séries TV ({totalResults})
        </h3>
        <OrderingSelect />
      </div>
      <div className="mb-4 ml-4 lg:hidden">
        <Button onClick={() => setOpenFilters((prev) => !prev)}>
          Ajouter des Filtres
        </Button>
      </div>
      <div className="hidden lg:flex lg:flex-row">
        <Filters
          filterType="tv"
          filters={filters}
          setFilters={setFilters}
          genres={genresTvShows}
          providers={providersTvShows}
        />
        <div className="w-full lg:w-[75%]">
          <Cards items={tvShowsList} filterType="tv" genres={genresTvShows} />
          <Pagination
            total={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
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
        <div className="w-full">
          <Cards items={tvShowsList} filterType="tv" genres={genresTvShows} />
          <Pagination
            total={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default TvShowsWrapper;
