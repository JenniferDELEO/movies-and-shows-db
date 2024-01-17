import OrderingSelect from "@/components/Filters/OrderingSelect";
import TvShowsWrapper from "@/components/ListWrapper/TvShowsWrapper";
import {
  getGenresTvShows,
  getPopularTvShows,
  getTvShowsProviders,
} from "@/libs/api/tvshows";

const TvShows = async () => {
  const { genres: genresTvShows } = await getGenresTvShows();
  const { results: popularTvShows } = await getPopularTvShows();
  const { results: providersTvShows } = await getTvShowsProviders();

  return (
    <TvShowsWrapper
      popularTvShows={popularTvShows}
      genresTvShows={genresTvShows}
      providersTvShows={providersTvShows}
    />
  );
};

export default TvShows;
