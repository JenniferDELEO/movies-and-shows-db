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
import { getPopularMovies } from "@/libs/api/movies";
import Pagination from "../Pagination/Pagination";

type Props = {
  popularMovies: Movie[];
  genresMovies: { id: number; name: string }[];
  providersMovies: Watcher[];
  totalPagesPopularMovies: number;
  totalResultsPopularMovies: number;
};

const MoviesWrapper: FC<Props> = (props) => {
  const {
    popularMovies,
    genresMovies,
    providersMovies,
    totalPagesPopularMovies,
    totalResultsPopularMovies,
  } = props;
  const pathname = usePathname();
  const [moviesList, setMoviesList] = useState<Movie[]>(popularMovies);
  const [filters, setFilters] = useState<any[]>([]);
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(
    totalResultsPopularMovies,
  );
  const [totalPages, setTotalPages] = useState<number>(totalPagesPopularMovies);
  const [currentPage, setCurrentPage] = useState(
    pathname.split("/")[2] ? parseInt(pathname.split("/")[2]) : 1,
  );

  async function getPopularMoviesNextPages() {
    const result = await getPopularMovies(currentPage);
    setMoviesList(result.results);
  }

  useEffect(() => {
    if (currentPage > 1) {
      getPopularMoviesNextPages();
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
