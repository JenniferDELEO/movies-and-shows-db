import TopBanner from "@/components/TopBanner/TopBanner";
import { getDiscoverMovies, getDiscoverTvShows } from "@/libs/apis";

export default async function Home() {
  const { results: popularMovies } = await getDiscoverMovies("1", "popularity");
  const { results: popularTvShows } = await getDiscoverTvShows(
    "1",
    "popularity"
  );

  return (
    <div className="w-full h-full">
      <TopBanner popularItems={popularMovies} popularType="Films" />
      <TopBanner popularItems={popularTvShows} popularType="Séries TV" />
    </div>
  );
}
