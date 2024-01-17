import Banner from "@/components/HomeBanner/Banner";
import SearchBar from "@/components/Search/SearchBar";
import { getPopularMovies, getTopRatedMovies } from "@/libs/api/movies";
import { getPopularTvShows, getTopRatedTvShows } from "@/libs/api/tvshows";

export default async function Home() {
  const { results: popularMovies } = await getPopularMovies();
  const { results: topRatedMovies } = await getTopRatedMovies();

  const { results: popularTvShows } = await getPopularTvShows();
  const { results: topRatedTvShows } = await getTopRatedTvShows();

  return (
    <div className="size-full">
      <SearchBar
        styleBase="w-full md:w-[90%] ml-2 md:mx-auto mb-20"
        styleContainer="flex flex-row items-center justify-start md:justify-center"
      />
      <Banner
        popularMovies={popularMovies}
        popularTvShows={popularTvShows}
        topRatedMovies={topRatedMovies}
        topRatedTvShows={topRatedTvShows}
      />
    </div>
  );
}
