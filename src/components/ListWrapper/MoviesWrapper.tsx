"use client";

import { FC, useState } from "react";

import Filters from "@/components/Filters/Filters";
import Cards from "@/components/Cards/Cards";
import { Movie } from "@/models/movies";
import OrderingSelect from "../Filters/OrderingSelect";
import { Button } from "@nextui-org/react";
import { Watcher } from "@/models/watchers";
import FiltersModal from "../Modals/FiltersModal";

type Props = {
  popularMovies: Movie[];
  genresMovies: { id: number; name: string }[];
  providersMovies: Watcher[];
};

const MoviesWrapper: FC<Props> = (props) => {
  const { popularMovies, genresMovies, providersMovies } = props;
  const [moviesList, setMoviesList] = useState<Movie[]>(popularMovies);
  const [filters, setFilters] = useState<any[]>([]);
  const [openFilters, setOpenFilters] = useState<boolean>(false);

  return (
    <div>
      <div className="mx-4 mb-4 flex flex-row items-baseline justify-between">
        <h3 className="text-lg lg:text-xl">Liste des films</h3>
        <div className="lg:hidden">
          <Button onClick={() => setOpenFilters((prev) => !prev)}>
            Filtres
          </Button>
        </div>
        <OrderingSelect />
      </div>
      <div className="hidden lg:flex lg:flex-row">
        <Filters
          filterType="movie"
          filters={filters}
          setFilters={setFilters}
          genres={genresMovies}
          providers={providersMovies}
        />
        <Cards items={moviesList} filterType="movie" genres={genresMovies} />
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
        <Cards items={moviesList} filterType="movie" genres={genresMovies} />
      </div>
    </div>
  );
};

export default MoviesWrapper;
