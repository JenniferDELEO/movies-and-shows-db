/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ChangeEvent, FC, useEffect, useState, useRef } from "react";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";

import Filters from "@/components/Filters/Filters";
import Cards from "@/components/Cards/Cards";
import { Movie } from "@/models/movies";
import OrderingSelect from "../Filters/OrderingSelect";
import { Watcher } from "@/models/watchers";
import FiltersModal from "../Modals/FiltersModal";
import { getDiscoverMovies } from "@/libs/api/movies";
import Pagination from "../Pagination/Pagination";
import { defaultFilters } from "@/libs/helpers/filters";
import { Filters as FiltersType } from "@/models/filters";

type Props = {
  movies: Movie[];
  genresMovies: { id: number; name: string }[];
  providersMovies: Watcher[];
  totalPagesMovies: number;
  totalResultsMovies: number;
};

const MoviesWrapper: FC<Props> = (props) => {
  const {
    movies,
    genresMovies,
    providersMovies,
    totalPagesMovies,
    totalResultsMovies,
  } = props;
  const pathname = usePathname();
  const [moviesList, setMoviesList] = useState<Movie[]>(movies);
  const [filters, setFilters] = useState<FiltersType>(defaultFilters);
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(totalResultsMovies);
  const [totalPages, setTotalPages] = useState<number>(totalPagesMovies);
  const [filterType, setFilterType] = useState("popularity.desc");
  const [currentPage, setCurrentPage] = useState(
    pathname.split("/")[2] ? parseInt(pathname.split("/")[2]) : 1,
  );
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  async function getMoviesNextPages() {
    const result = await getDiscoverMovies({
      ...filters,
      page: currentPage,
    });
    setMoviesList(result.results);
  }

  useEffect(() => {
    if (currentPage > 1) {
      getMoviesNextPages();
    }
  }, [currentPage]);

  const handleOrderingSelection = async (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, sort_by: e.target.value });
    setFilterType(e.target.value);
    const result = await getDiscoverMovies({
      ...filters,
      sort_by: e.target.value,
      page: currentPage,
    });
    setMoviesList(result.results);
  };

  const handleFiltersSelection = async () => {
    const result = await getDiscoverMovies({
      ...filters,
    });
    setMoviesList(result.results);
    setTotalResults(result.total_results);
    setTotalPages(result.total_pages);
    scrollToTop();
  };

  return (
    <div className="w-full">
      <div className="mx-4 mb-4 flex flex-row items-baseline justify-between">
        <h3 className="text-lg lg:text-xl">Liste des films ({totalResults})</h3>
        <OrderingSelect
          filterType={filterType}
          handleSelectionChange={handleOrderingSelection}
        />
      </div>
      <div className="mb-4 ml-4 lg:hidden">
        <Button onClick={() => setOpenFilters((prev) => !prev)}>
          Ajouter des Filtres
        </Button>
      </div>
      <div className="hidden lg:flex lg:flex-row">
        <Filters
          filters={filters}
          setFilters={setFilters}
          genres={genresMovies}
          providers={providersMovies}
          setIsFiltering={setIsFiltering}
        />
        <div className="w-full lg:w-[75%]" ref={ref}>
          <Cards items={moviesList} filterType="movie" genres={genresMovies} />
          <Pagination
            total={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            scrollToTop={scrollToTop}
          />
        </div>
      </div>
      <div className="lg:hidden">
        <FiltersModal
          modalIsOpen={openFilters}
          setModalIsOpen={setOpenFilters}
          filterType="movie"
          filters={filters}
          setFilters={setFilters}
          genres={genresMovies}
          providers={providersMovies}
        />
        <div className="w-full">
          <Cards items={moviesList} filterType="movie" genres={genresMovies} />
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
          className="sticky bottom-0 left-0 w-full rounded-lg bg-secondary text-white"
        >
          Rechercher
        </Button>
      )}
    </div>
  );
};

export default MoviesWrapper;
