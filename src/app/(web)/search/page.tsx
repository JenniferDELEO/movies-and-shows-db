import type { Metadata } from "next";

import SearchBar from "@/components/Search/SearchBar";
import SearchFilters from "@/components/Search/SearchFilters";
import SearchResult from "@/components/Search/SearchResult";

export const metadata: Metadata = {
  title: "Recherche - Films & Séries TV DB",
};

const SearchPage = ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; type?: string };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const filterType = searchParams?.type || "movie";

  return (
    <div className="mx-auto min-h-screen w-full md:w-[95%] lg:w-[90%]">
      <SearchBar
        styleBase="w-full md:w-[90%] ml-2 md:mx-auto mb-20"
        styleContainer="flex flex-row items-center justify-start md:justify-center"
      />
      <div className=" mx-4 grid-cols-2">
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
