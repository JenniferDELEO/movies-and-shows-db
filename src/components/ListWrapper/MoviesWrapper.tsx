/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FC, useEffect, useState } from "react";
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
  const [filters, setFilters] = useState<any[]>([]);
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(totalResultsMovies);
  const [totalPages, setTotalPages] = useState<number>(totalPagesMovies);
  const [currentPage, setCurrentPage] = useState(
    pathname.split("/")[2] ? parseInt(pathname.split("/")[2]) : 1,
  );

  async function getMoviesNextPages() {
    const result = await getDiscoverMovies({
      ...defaultFilters,
      page: currentPage,
    });
    setMoviesList(result.results);
  }

  useEffect(() => {
    if (currentPage > 1) {
      getMoviesNextPages();
    }
  }, [currentPage]);

  return (
    <div>
      <div className="mx-4 mb-4 flex flex-row items-baseline justify-between">
        <h3 className="text-lg lg:text-xl">Liste des films ({totalResults})</h3>
        <OrderingSelect />
      </div>
      <div className="mb-4 ml-4 lg:hidden">
        <Button onClick={() => setOpenFilters((prev) => !prev)}>
          Ajouter des Filtres
        </Button>
      </div>
      <div className="hidden lg:flex lg:flex-row">
        <Filters
          filterType="movie"
          filters={filters}
          setFilters={setFilters}
          genres={genresMovies}
          providers={providersMovies}
        />
        <div className="w-full lg:w-[75%]">
          <Cards items={moviesList} filterType="movie" genres={genresMovies} />
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
          />
        </div>
      </div>
    </div>
  );
};

export default MoviesWrapper;
