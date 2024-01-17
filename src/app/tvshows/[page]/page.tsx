import TvShowsWrapper from "@/components/ListWrapper/TvShowsWrapper";
import {
  getGenresTvShows,
  getPopularTvShows,
  getTvShowsProviders,
} from "@/libs/api/tvshows";

const TvShows = async () => {
  const { genres: genresTvShows } = await getGenresTvShows();
  const {
    results: popularTvShows,
    total_pages: totalPagesPopularTvShows,
    total_results: totalResultsPopularTvShows,
  } = await getPopularTvShows(1);
  const { results: providersTvShows } = await getTvShowsProviders();

  return (
    <TvShowsWrapper
      popularTvShows={popularTvShows}
      genresTvShows={genresTvShows}
      providersTvShows={providersTvShows}
      totalPagesPopularTvShows={totalPagesPopularTvShows}
      totalResultsPopularTvShows={totalResultsPopularTvShows}
    />
  );
};

export default TvShows;
