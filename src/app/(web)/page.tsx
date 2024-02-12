import BannerWrapper from "@/components/Banner/BannerWrapper";
import SearchBar from "@/components/Search/SearchBar";
import {
  getGenresMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "@/libs/api/movies";
import {
  getDiscoverTvShows,
  getTopRatedTvShows,
  getTrendingTvShows,
} from "@/libs/api/tvshows";
import { defaultTvShowsFilters } from "@/libs/helpers/filters";
import { getAllMovies, getUserMovies } from "@/libs/sanity/api/movie";
import { authOptions } from "@/libs/sanity/auth";
import { InternalMovieUser } from "@/models/movies";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const { results: popularMovies } = await getPopularMovies(1);
  const { results: topRatedMovies } = await getTopRatedMovies();
  const { results: trendingMoviesToday } = await getTrendingMovies("day");
  const { results: trendingMoviesThisWeek } = await getTrendingMovies("week");

  const { results: popularTvShows } = await getDiscoverTvShows(
    defaultTvShowsFilters,
  );
  const { results: topRatedTvShows } = await getTopRatedTvShows();
  const { results: trendingTvShowsToday } = await getTrendingTvShows("day");
  const { results: trendingTvShowsThisWeek } = await getTrendingTvShows("week");

  const { genres: genresMovies } = await getGenresMovies();

  let userMovies: InternalMovieUser[] = [];
  let userMoviesId: string = "";
  if (session) {
    const results = await getUserMovies(session.user.id);
    userMovies = results?.movies || [];
    userMoviesId = results?._id;
  }

  const internalMovies = await getAllMovies();

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
          trendingMoviesToday,
          trendingMoviesThisWeek,
          trendingTvShowsToday,
          trendingTvShowsThisWeek,
          internalMovies,
          genresMovies,
          userMovies,
          userMoviesId,
        }}
      />
    </div>
  );
}
