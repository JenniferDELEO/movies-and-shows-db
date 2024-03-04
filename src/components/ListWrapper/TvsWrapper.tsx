/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";

import Filters from "@/components/Filters/Filters";
import Cards from "@/components/Cards/Cards";
import { InternalTv, InternalTvAndUser, Tv } from "@/models/tvs";
import OrderingSelect from "@/components/Filters/OrderingSelect";
import { Watcher } from "@/models/watchers";
import FiltersModal from "@/components/Modals/FiltersModal";
import Pagination from "@/components/Pagination/Pagination";
import { getDiscoverTvs } from "@/libs/api/tvs";
import { defaultTvsFilters } from "@/libs/helpers/filters";
import { TvsFilters } from "@/models/filters";

type Props = {
  tvs: Tv[];
  genresTvs: { id: number; name: string }[];
  providersTvs: Watcher[];
  title: string;
  totalPagesTvs: number;
  userTvs: InternalTvAndUser[];
  internalTvs: InternalTv[];

  defaultFilters?: TvsFilters;
};

const TvsWrapper: FC<Props> = (props) => {
  const {
    tvs,
    genresTvs,
    providersTvs,
    title,
    totalPagesTvs,
    userTvs,
    internalTvs,

    defaultFilters,
  } = props;
  const pathname = usePathname();
  const [tvsList, setTvsList] = useState<Tv[]>(tvs);
  const [filters, setFilters] = useState<TvsFilters>(
    defaultFilters || defaultTvsFilters,
  );
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(totalPagesTvs);
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

  async function getTvsNextPages() {
    const result = await getDiscoverTvs({
      ...filters,
      page: currentPage,
    });
    setTvsList(result.results);
  }

  useEffect(() => {
    if (currentPage > 1) {
      getTvsNextPages();
    }
  }, [currentPage]);

  const handleOrderingSelection = async (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, sort_by: e.target.value });
    setFilterType(e.target.value);
    const result = await getDiscoverTvs({
      ...filters,
      sort_by: e.target.value,
      page: currentPage,
    });
    setTvsList(result.results);
  };

  const handleFiltersSelection = async () => {
    const result = await getDiscoverTvs({
      ...filters,
    });
    setTvsList(result.results);
    setTotalPages(result.total_pages);
    scrollToTop();
  };

  const handleResetFilters = async () => {
    setFilters(defaultTvsFilters);
    const result = await getDiscoverTvs({
      ...defaultTvsFilters,
    });
    setTvsList(result.results);
    setTotalPages(result.total_pages);
    setIsResetting(true);
  };

  const hideResetButton = () => {
    if (
      filters["first_air_date.gte"] !==
        defaultTvsFilters["first_air_date.gte"] ||
      filters["first_air_date.lte"] !==
        defaultTvsFilters["first_air_date.lte"] ||
      filters.show_me !== defaultTvsFilters.show_me ||
      filters["vote_average.gte"] !== defaultTvsFilters["vote_average.gte"] ||
      filters["vote_average.lte"] !== defaultTvsFilters["vote_average.lte"] ||
      filters["vote_count.gte"] !== defaultTvsFilters["vote_count.gte"] ||
      filters.with_genres !== defaultTvsFilters.with_genres ||
      filters.with_original_language !==
        defaultTvsFilters.with_original_language ||
      filters["with_runtime.gte"] !== defaultTvsFilters["with_runtime.gte"] ||
      filters["with_runtime.lte"] !== defaultTvsFilters["with_runtime.lte"] ||
      filters.with_watch_providers !== defaultTvsFilters.with_watch_providers ||
      filters.without_genres !== defaultTvsFilters.without_genres
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
          tvsFilters={filters}
          setTvsFilters={setFilters}
          genres={genresTvs}
          providers={providersTvs}
          setIsFiltering={setIsFiltering}
          isResetting={isResetting}
          setIsResetting={setIsResetting}
        />
        <div className="w-full lg:w-[75%]" ref={ref}>
          {tvsList.length > 0 ? (
            <>
              <Cards
                tvs={tvsList}
                filterType="tv"
                genres={genresTvs}
                userTvs={userTvs}
                internalTvs={internalTvs}
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
          tvsFilters={filters}
          setTvsFilters={setFilters}
          genres={genresTvs}
          providers={providersTvs}
          setIsFiltering={setIsFiltering}
          handleFiltersSelection={handleFiltersSelection}
          isResetting={isResetting}
          setIsResetting={setIsResetting}
        />
        <div className="w-full">
          <Cards tvs={tvsList} filterType="tv" genres={genresTvs} />
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

export default TvsWrapper;
