import HomeBanner from "@/components/HomeBanner/HomeBanner";
import SearchBar from "@/components/SearchBar/SearchBar";
import {
  getPopularMovies,
  getTopRatedMovies,
  getPopularTvShows,
  getTopRatedTvShows,
} from "@/libs/apis";

export default async function Home() {
  const { results: popularMovies } = await getPopularMovies();
  const { results: topRatedMovies } = await getTopRatedMovies();
  const { results: popularTvShows } = await getPopularTvShows();

  const { results: topRatedTvShows } = await getTopRatedTvShows();

  return (
    <div className="w-full h-full">
      <SearchBar
        styleBase="w-full md:w-2/3 ml-2 md:mx-auto mb-20"
        styleContainer="grid grid-cols-12 gap-4"
      />
      <HomeBanner items={popularMovies} type="Films" filter="plus populaires" />
      <HomeBanner items={topRatedMovies} type="Films" filter="mieux notés" />
      <HomeBanner
        items={popularTvShows}
        type="Séries TV"
        filter="plus populaires"
      />
      <HomeBanner
        items={topRatedTvShows}
        type="Séries TV"
        filter="mieux notées"
      />
    </div>
  );
}
