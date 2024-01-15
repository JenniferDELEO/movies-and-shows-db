import SearchBar from "@/components/Search/SearchBar";
import SearchFilters from "@/components/Search/SearchFilters";
import SearchResult from "@/components/Search/SearchResult";

const SearchPage = ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; type?: string };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const filterType = searchParams?.type || "movie";

  return (
    <div className="min-h-screen w-full">
      <SearchBar
        styleBase="w-full sm:w-2/3 mx-auto mb-20"
        styleContainer="grid grid-cols-12 gap-4"
      />
      <div className="relative ml-4 grid-cols-2 md:grid 2xl:grid-cols-4">
        <SearchFilters />
        <SearchResult
          query={query}
          currentPage={currentPage}
          filterType={filterType}
        />
      </div>
    </div>
  );
};

export default SearchPage;
