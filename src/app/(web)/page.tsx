import BannerWrapper from "@/components/Banner/BannerWrapper";
import SearchBar from "@/components/Search/SearchBar";
import { getPopularMovies, getTopRatedMovies, getTrendingMovies } from "@/libs/api/movies";
import { getDiscoverTvs, getTopRatedTvs, getTrendingTvs } from "@/libs/api/tvs";
import { defaultTvsFilters } from "@/libs/helpers/filters";

export default async function Home() {
  const { results: popularMovies } = await getPopularMovies(1);
  const { results: topRatedMovies } = await getTopRatedMovies();
  const { results: trendingMoviesToday } = await getTrendingMovies("day");
  const { results: trendingMoviesThisWeek } = await getTrendingMovies("week");

  const { results: popularTvs } = await getDiscoverTvs(defaultTvsFilters);
  const { results: topRatedTvs } = await getTopRatedTvs();
  const { results: trendingTvsToday } = await getTrendingTvs("day");
  const { results: trendingTvsThisWeek } = await getTrendingTvs("week");

  return (
    <div className="size-full">
      <SearchBar
        styleBase="w-full md:w-[90%] ml-2 md:mx-auto mb-20"
        styleContainer="flex flex-row items-center justify-start md:justify-center"
      />
      <BannerWrapper
        homeProps={{
          popularMovies,
          popularTvs,
          topRatedMovies,
          topRatedTvs,
          trendingMoviesToday,
          trendingMoviesThisWeek,
          trendingTvsToday,
          trendingTvsThisWeek
        }}
      />
    </div>
  );
}
