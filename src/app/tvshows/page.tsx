import Cards from "@/components/Cards/Cards";
import Filters from "@/components/Filters/Filters";
import OrderingSelect from "@/components/Filters/OrderingSelect";
import { getPopularTvShows } from "@/libs/api/tvshows";

const TvShows = async () => {
  const { results: popularTvShows } = await getPopularTvShows();
  return (
    <div>
      <div className="mx-4 mb-4 flex flex-row items-baseline justify-between">
        <h3 className="text-lg lg:text-xl">Liste des séries</h3>
        <OrderingSelect />
      </div>
      <div className="flex flex-row">
        <Filters />
        <Cards items={popularTvShows} filterType="tv" />
      </div>
    </div>
  );
};

export default TvShows;
