import Filters from "@/components/Filters/Filters";
import Cards from "@/components/Cards/Cards";
import OrderingSelect from "@/components/Filters/OrderingSelect";
import { getPopularMovies } from "@/libs/api/movies";

const Movies = async () => {
  const { results: popularMovies } = await getPopularMovies();
  return (
    <div>
      <div className="mx-4 mb-4 flex flex-row items-baseline justify-between">
        <h3 className="text-lg lg:text-xl">Liste des films</h3>
        <OrderingSelect />
      </div>
      <div className="flex flex-row">
        <Filters />
        <Cards items={popularMovies} filterType="movie" />
      </div>
    </div>
  );
};

export default Movies;
