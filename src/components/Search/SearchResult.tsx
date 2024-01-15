import Card from "@/components/Card/Card";
import { getSearchMovies } from "@/libs/api/movies";
import { getSearchTvShows } from "@/libs/api/tvshows";
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

  return (
    <div className="md:col-span-3">
      {!searchResults ? (
        <div className="text-center text-lg md:text-xl">Chargement...</div>
      ) : searchResults.length === 0 ? (
        <div className="text-center text-lg md:text-xl">Aucun résultat</div>
      ) : (
        <div className="lg:grid lg:grid-cols-2 lg:gap-4">
          <h3 className="absolute -top-10 left-0 text-lg md:text-xl lg:left-4 2xl:left-1 2xl:top-0">
            Résultats de votre recherche ({totalSearchResults})
          </h3>
          {searchResults.map((item) => (
            <Card key={item.id} item={item} filterType={filterType} />
          ))}
          <Pagination total={totalSearchPages} />
        </div>
      )}
    </div>
  );
};

export default SearchResult;
