/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";

import Filters from "@/components/Filters/Filters";
import Cards from "@/components/Cards/Cards";
import { TvShow } from "@/models/tvShows";
import OrderingSelect from "@/components/Filters/OrderingSelect";
import { Watcher } from "@/models/watchers";
import FiltersModal from "@/components/Modals/FiltersModal";
import Pagination from "@/components/Pagination/Pagination";
import { getDiscoverTvShows } from "@/libs/api/tvShows";
import { defaultTvShowsFilters } from "@/libs/helpers/filters";
import { TvShowsFilters } from "@/models/filters";

type Props = {
  tvShows: TvShow[];
  genresTvShows: { id: number; name: string }[];
  providersTvShows: Watcher[];
  title: string;
  totalPagesTvShows: number;

  defaultFilters?: TvShowsFilters;
};

const TvShowsWrapper: FC<Props> = (props) => {
  const {
    tvShows,
    genresTvShows,
    providersTvShows,
    title,
    totalPagesTvShows,

    defaultFilters,
  } = props;
  const pathname = usePathname();
  const [tvShowsList, setTvShowsList] = useState<TvShow[]>(tvShows);
  const [filters, setFilters] = useState<TvShowsFilters>(
    defaultFilters || defaultTvShowsFilters,
  );
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(totalPagesTvShows);
  const [filterType, setFilterType] = useState("popularity.desc");
  const [currentPage, setCurrentPage] = useState(
    pathname.split("/")[2] ? parseInt(pathname.split("/")[2]) : 1,
  );
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  async function getTvShowsNextPages() {
    const result = await getDiscoverTvShows({
      ...filters,
      page: currentPage,
    });
    setTvShowsList(result.results);
  }

  useEffect(() => {
    if (currentPage > 1) {
      getTvShowsNextPages();
    }
  }, [currentPage]);

  const handleOrderingSelection = async (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, sort_by: e.target.value });
    setFilterType(e.target.value);
    const result = await getDiscoverTvShows({
      ...filters,
      sort_by: e.target.value,
      page: currentPage,
    });
    setTvShowsList(result.results);
  };

  const handleFiltersSelection = async () => {
    const result = await getDiscoverTvShows({
      ...filters,
    });
    setTvShowsList(result.results);
    setTotalPages(result.total_pages);
    scrollToTop();
  };

  const handleResetFilters = async () => {
    setFilters(defaultTvShowsFilters);
    const result = await getDiscoverTvShows({
      ...defaultTvShowsFilters,
    });
    setTvShowsList(result.results);
    setTotalPages(result.total_pages);
    setIsResetting(true);
  };

  const hideResetButton = () => {
    if (
      filters["first_air_date.gte"] !==
        defaultTvShowsFilters["first_air_date.gte"] ||
      filters["first_air_date.lte"] !==
        defaultTvShowsFilters["first_air_date.lte"] ||
      filters.show_me !== defaultTvShowsFilters.show_me ||
      filters["vote_average.gte"] !==
        defaultTvShowsFilters["vote_average.gte"] ||
      filters["vote_average.lte"] !==
        defaultTvShowsFilters["vote_average.lte"] ||
      filters["vote_count.gte"] !== defaultTvShowsFilters["vote_count.gte"] ||
      filters.with_genres !== defaultTvShowsFilters.with_genres ||
      filters.with_original_language !==
        defaultTvShowsFilters.with_original_language ||
      filters["with_runtime.gte"] !==
        defaultTvShowsFilters["with_runtime.gte"] ||
      filters["with_runtime.lte"] !==
        defaultTvShowsFilters["with_runtime.lte"] ||
      filters.with_watch_providers !==
        defaultTvShowsFilters.with_watch_providers ||
      filters.without_genres !== defaultTvShowsFilters.without_genres
    ) {
      return false;
    } else return true;
  };

  return (
    <div className="mx-auto w-full md:w-[95%] lg:w-[90%]">
      <div className="mx-4 mb-4 flex flex-row items-baseline justify-between">
        <h3 className="text-lg lg:text-xl">{title}</h3>
        <div className="hidden lg:block">
          {!hideResetButton() && (
            <Button onClick={handleResetFilters}>Effacer les Filtres</Button>
          )}
        </div>
        <OrderingSelect
          filterType={filterType}
          handleSelectionChange={handleOrderingSelection}
        />
      </div>
      <div className="mx-4 mb-4 flex flex-row items-center justify-between lg:hidden">
        <Button onClick={() => setOpenFilters((prev) => !prev)}>
          Ajouter des Filtres
        </Button>
        {!hideResetButton() && (
          <Button onClick={handleResetFilters}>Effacer les Filtres</Button>
        )}
      </div>
      <div className="hidden lg:flex lg:flex-row">
        <Filters
          tvShowsFilters={filters}
          setTvShowsFilters={setFilters}
          genres={genresTvShows}
          providers={providersTvShows}
          setIsFiltering={setIsFiltering}
          isResetting={isResetting}
          setIsResetting={setIsResetting}
        />
        <div className="w-full lg:w-[75%]" ref={ref}>
          {tvShowsList.length > 0 ? (
            <>
              <Cards
                tvShows={tvShowsList}
                filterType="tvShow"
                genres={genresTvShows}
              />
              <Pagination
                total={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                scrollToTop={scrollToTop}
              />
            </>
          ) : (
            <div className="mt-20 flex w-full flex-col items-center justify-center">
              <h3 className="mb-4 text-lg lg:text-xl">
                Aucune série TV ne correspond à vos critères
              </h3>
              <Button onClick={handleResetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden">
        <FiltersModal
          modalIsOpen={openFilters}
          setModalIsOpen={setOpenFilters}
          tvShowsFilters={filters}
          setTvShowsFilters={setFilters}
          genres={genresTvShows}
          providers={providersTvShows}
          setIsFiltering={setIsFiltering}
          handleFiltersSelection={handleFiltersSelection}
          isResetting={isResetting}
          setIsResetting={setIsResetting}
        />
        <div className="w-full">
          <Cards
            tvShows={tvShowsList}
            filterType="tvShow"
            genres={genresTvShows}
          />
          <Pagination
            total={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            scrollToTop={scrollToTop}
          />
        </div>
      </div>
      {isFiltering && (
        <Button
          onClick={handleFiltersSelection}
          className="bottom-0 left-0 hidden w-full rounded-lg bg-secondary text-white lg:sticky lg:block"
        >
          Rechercher
        </Button>
      )}
    </div>
  );
};

export default TvShowsWrapper;
