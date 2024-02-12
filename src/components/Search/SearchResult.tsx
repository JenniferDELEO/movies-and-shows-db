import { getGenresMovies, getSearchMovies } from "@/libs/api/movies";
import { getGenresTvShows, getSearchTvShows } from "@/libs/api/tvshows";
import Pagination from "@/components/Pagination/Pagination";
import { getSearchPeople } from "@/libs/api/people";
import { InternalMovieUser } from "@/models/movies";
import Loading from "@/components/Loading/Loading";
import SearchResultCards from "./SearchResultCards";
import { getAllMovies, getUserMovies } from "@/libs/sanity/api/movie";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/sanity/auth";

type Props = {
  query: string;
  currentPage: number;
  filterType: string;
};

const SearchResult = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const { query, currentPage, filterType } = props;
  const {
    results: searchResultsMovies,
    total_pages: totalSearchPagesMovies,
    total_results: totalSearchResultsMovies,
  } = await getSearchMovies(query, currentPage);
  const {
    results: searchResultsTvShows,
    total_pages: totalSearchPagesTvShows,
    total_results: totalSearchResultsTvShows,
  } = await getSearchTvShows(query, currentPage);
  const {
    results: searchResultsPeople,
    total_pages: totalSearchPagesPeople,
    total_results: totalSearchResultsPeople,
  } = await getSearchPeople(query, currentPage);

  const { genres: genresMovies } = await getGenresMovies();
  const { genres: genresTvShows } = await getGenresTvShows();

  let userMovies: InternalMovieUser[] = [];
  let userMoviesId: string = "";
  if (session) {
    const results = await getUserMovies(session.user.id);
    userMovies = results?.movies || [];
    userMoviesId = results?._id;
  }

  const internalMovies = await getAllMovies();

  return (
    <div className="md:col-span-3">
      {(filterType === "movie" && !searchResultsMovies && !genresMovies) ||
      (filterType === "tv" && !searchResultsTvShows && !genresTvShows) ||
      (filterType === "people" && !searchResultsPeople) ? (
        <Loading />
      ) : (filterType === "movie" && searchResultsMovies.length === 0) ||
        (filterType === "tv" && searchResultsTvShows.length === 0) ||
        (filterType === "people" && searchResultsPeople.length === 0) ? (
        <div className="text-center text-lg md:text-xl">Aucun résultat</div>
      ) : (
        <div>
          <h3 className="mb-4 text-center text-lg md:text-xl">
            Résultats de votre recherche{" "}
            <span className="text-xs font-bold md:text-lg">
              (
              {filterType === "movie"
                ? totalSearchResultsMovies
                : filterType === "tv"
                  ? totalSearchResultsTvShows
                  : totalSearchResultsPeople}
              )
            </span>
          </h3>
          <SearchResultCards
            filterType={filterType}
            searchResultsMovies={searchResultsMovies}
            searchResultsTvShows={searchResultsTvShows}
            searchResultsPeople={searchResultsPeople}
            genresMovies={genresMovies}
            genresTvShows={genresTvShows}
            userMovies={userMovies}
            userMoviesId={userMoviesId}
            internalMovies={internalMovies}
          />

          <Pagination
            total={
              filterType === "movie"
                ? totalSearchPagesMovies
                : filterType === "tv"
                  ? totalSearchPagesTvShows
                  : totalSearchPagesPeople
            }
            fromSearch={true}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResult;
