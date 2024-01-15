"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
} from "@nextui-org/react";
import SearchFiltersWrapper from "./SearchFiltersWrapper";
import { MdLocalMovies } from "react-icons/md";
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
    <div>
      <div className="mb-4 lg:px-4 2xl:hidden">
        <Button
          className={`${filterType === "movie" ? "bg-secondary" : ""} mr-4`}
          onPress={() => handleChangeFilterType("movie")}
        >
          Films
        </Button>
        <Button
          className={`${filterType === "tv" ? "bg-secondary" : ""} mr-4`}
          onPress={() => handleChangeFilterType("tv")}
        >
          Séries TV
        </Button>
      </div>
      <div className="hidden 2xl:block">
        <SearchFiltersWrapper>
          <Listbox
            aria-label="Actions"
            onAction={(key: React.Key) =>
              handleChangeFilterType(key.toString())
            }
          >
            <ListboxSection showDivider>
              <ListboxItem
                key="movie"
                startContent={<MdLocalMovies />}
                classNames={{
                  base: `${filterType === "movie" ? "bg-[#3B393F]" : ""}`,
                  title: `${filterType === "movie" ? "font-bold" : ""}`,
                }}
              >
                Films
              </ListboxItem>
            </ListboxSection>
            <ListboxSection>
              <ListboxItem
                key="tv"
                startContent={<PiTelevisionSimpleFill />}
                classNames={{
                  base: `${filterType === "tv" ? "bg-[#3B393F]" : ""}`,
                  title: `${filterType === "tv" ? "font-bold" : ""}`,
                }}
              >
                Séries TV
              </ListboxItem>
            </ListboxSection>
          </Listbox>
        </SearchFiltersWrapper>
      </div>
    </div>
  );
};

export default SearchFilters;
