import BannerWrapper from "@/components/Banner/BannerWrapper";
import SearchBar from "@/components/Search/SearchBar";
import {
  getGenresMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "@/libs/api/movies";
import {
  getDiscoverTvs,
  getGenresTvs,
  getTopRatedTvs,
  getTrendingTvs,
} from "@/libs/api/tvs";
import { defaultTvsFilters } from "@/libs/helpers/filters";
import { getAllMovies, getUserMovies } from "@/libs/sanity/api/movie";
import { getAllTvs, getUserTvs } from "@/libs/sanity/api/tv";
import { authOptions } from "@/libs/sanity/auth";
import { InternalMovieUser } from "@/models/movies";
import { InternalTvAndUser } from "@/models/tvs";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const { results: popularMovies } = await getPopularMovies(1);
  const { results: topRatedMovies } = await getTopRatedMovies();
  const { results: trendingMoviesToday } = await getTrendingMovies("day");
  const { results: trendingMoviesThisWeek } = await getTrendingMovies("week");

  const { results: popularTvs } = await getDiscoverTvs(defaultTvsFilters);
  const { results: topRatedTvs } = await getTopRatedTvs();
  const { results: trendingTvsToday } = await getTrendingTvs("day");
  const { results: trendingTvsThisWeek } = await getTrendingTvs("week");

  const { genres: genresMovies } = await getGenresMovies();
  const { genres: genresTvs } = await getGenresTvs();

  let userMovies: InternalMovieUser[] = [];
  let userMoviesId: string = "";
  let userTvs: InternalTvAndUser[] = [];

  if (session) {
    const responseUserMovies = await getUserMovies(session.user.id);
    userMovies = responseUserMovies?.movies || [];
    userMoviesId = responseUserMovies?._id;
    userTvs = await getUserTvs(session.user.id);
  }

  const internalMovies = await getAllMovies();
  const internalTvs = await getAllTvs();

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
          trendingTvsThisWeek,
          internalMovies,
          genresMovies,
          userMovies,
          userMoviesId,
          internalTvs,
          genresTvs,
          userTvs,
        }}
      />
    </div>
  );
}
