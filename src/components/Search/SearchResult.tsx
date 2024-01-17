import Card from "@/components/Cards/Card";
import { getGenresMovies, getSearchMovies } from "@/libs/api/movies";
import { getGenresTvShows, getSearchTvShows } from "@/libs/api/tvshows";
import Pagination from "../Pagination/Pagination";

type Props = {
  query: string;
  currentPage: number;
  filterType: string;
};

const SearchResult = async (props: Props) => {
  const { query, currentPage, filterType } = props;
  const {
    results: searchResults,
    total_pages: totalSearchPages,
    total_results: totalSearchResults,
  } = filterType === "movie"
    ? await getSearchMovies(query, currentPage)
    : await getSearchTvShows(query, currentPage);

  const { genres: genresMovies } = await getGenresMovies();
  const { genres: genresTvShows } = await getGenresTvShows();

  return (
    <div className="md:col-span-3">
      {!searchResults || !genresMovies || !genresTvShows ? (
        <div className="text-center text-lg md:text-xl">Chargement...</div>
      ) : searchResults.length === 0 ? (
        <div className="text-center text-lg md:text-xl">Aucun résultat</div>
      ) : (
        <div>
          <h3 className="mb-4 text-center text-lg md:text-xl">
            Résultats de votre recherche{" "}
            <span className="text-xs font-bold md:text-lg">
              ({totalSearchResults})
            </span>
          </h3>
          <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-4">
            {searchResults.map((item) => (
              <Card
                key={item.id}
                item={item}
                filterType={filterType}
                genres={filterType === "movie" ? genresMovies : genresTvShows}
              />
            ))}
          </div>

          <Pagination total={totalSearchPages} fromSearch={true} />
        </div>
      )}
    </div>
  );
};

export default SearchResult;
