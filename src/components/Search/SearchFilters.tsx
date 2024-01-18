"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { MdLocalMovies, MdPeople } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";

const SearchFilters = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  const query = searchParams.get("query")?.toString() || "";
  const filterType = searchParams.get("type")?.toString() || "";

  function handleChangeFilterType(type: string) {
    params.set("page", "1");
    params.set("type", type);
    params.set("query", query);
    replace(`/search?${params.toString()}`);
  }

  return (
    <div className="mb-4 flex items-center justify-end px-4">
      <Button
        className={`${filterType === "movie" ? "bg-secondary" : ""} mr-4`}
        onPress={() => handleChangeFilterType("movie")}
      >
        <MdLocalMovies />
        Films
      </Button>
      <Button
        className={`${filterType === "tv" ? "bg-secondary" : ""} mr-4`}
        onPress={() => handleChangeFilterType("tv")}
      >
        <PiTelevisionSimpleFill />
        Séries TV
      </Button>
      <Button
        className={`${filterType === "people" ? "bg-secondary" : ""} mr-4`}
        onPress={() => handleChangeFilterType("people")}
      >
        <MdPeople />
        Artistes
      </Button>
    </div>
  );
};

export default SearchFilters;
