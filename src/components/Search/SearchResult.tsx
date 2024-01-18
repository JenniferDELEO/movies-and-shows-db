import Card from "@/components/Cards/Card";
import { getGenresMovies, getSearchMovies } from "@/libs/api/movies";
import { getGenresTvShows, getSearchTvShows } from "@/libs/api/tvshows";
import Pagination from "../Pagination/Pagination";
import { getSearchPeople } from "@/libs/api/people";
import PeopleCard from "../People/PeopleCard";
import { People } from "@/models/people";
import { TvShow } from "@/models/tvShows";
import { Movie } from "@/models/movies";

type Props = {
  query: string;
  currentPage: number;
  filterType: string;
};

const SearchResult = async (props: Props) => {
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

  return (
    <div className="md:col-span-3">
      {(filterType === "movie" && !searchResultsMovies && !genresMovies) ||
      (filterType === "tv" && !searchResultsTvShows && !genresTvShows) ||
      (filterType === "people" && !searchResultsPeople) ? (
        <div className="text-center text-lg md:text-xl">Chargement...</div>
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
          {filterType === "movie" ? (
            <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-4">
              {searchResultsMovies.map((item: Movie) => (
                <Card
                  key={item.id}
                  item={item}
                  filterType={filterType}
                  genres={genresMovies}
                />
              ))}
            </div>
          ) : filterType === "tv" ? (
            <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-4">
              {searchResultsTvShows.map((item: TvShow) => (
                <Card
                  key={item.id}
                  item={item}
                  filterType={filterType}
                  genres={genresTvShows}
                />
              ))}
            </div>
          ) : (
            <div className="md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-4">
              {searchResultsPeople.map((item: People) => (
                <PeopleCard key={item.id} item={item} />
              ))}
            </div>
          )}

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
