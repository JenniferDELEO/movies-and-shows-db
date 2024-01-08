import HomeBanner from "@/components/HomeBanner/HomeBanner";
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
