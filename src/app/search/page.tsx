import SearchBar from "@/components/SearchBar/SearchBar";
import React from "react";

const SearchPage = ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="min-h-screen w-full">
      <SearchBar
        styleBase="w-full sm:w-2/3 mx-auto mb-20"
        styleContainer="grid grid-cols-12 gap-4"
      />
    </div>
  );
};

export default SearchPage;
