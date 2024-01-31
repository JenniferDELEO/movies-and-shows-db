import BannerWrapper from "@/components/Banner/BannerWrapper";
import SearchBar from "@/components/Search/SearchBar";
import { getPopularMovies, getTopRatedMovies } from "@/libs/api/movies";
import { getDiscoverTvShows, getTopRatedTvShows } from "@/libs/api/tvshows";
import { defaultTvShowsFilters } from "@/libs/helpers/filters";

export default async function Home() {
  const { results: popularMovies } = await getPopularMovies(1);
  const { results: topRatedMovies } = await getTopRatedMovies();

  const { results: popularTvShows } = await getDiscoverTvShows(
    defaultTvShowsFilters,
  );
  const { results: topRatedTvShows } = await getTopRatedTvShows();

  return (
    <div className="size-full">
      <SearchBar
        styleBase="w-full md:w-[90%] ml-2 md:mx-auto mb-20"
        styleContainer="flex flex-row items-center justify-start md:justify-center"
      />
      <BannerWrapper
        homeProps={{
          popularMovies,
          popularTvShows,
          topRatedMovies,
          topRatedTvShows,
        }}
      />
    </div>
  );
}
