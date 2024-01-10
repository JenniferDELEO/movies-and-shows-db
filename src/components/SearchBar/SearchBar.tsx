"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { TiDelete } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { Dispatch, FC, SetStateAction, useState } from "react";

type Props = {
  styleBase: string;
  styleContainer: string;
  setIsSearchOpen?: Dispatch<SetStateAction<boolean>>;
  isHeader?: boolean;
};

const SearchBar: FC<Props> = (props) => {
  const { styleBase, styleContainer, setIsSearchOpen, isHeader } = props;
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get("query")?.toString() || ""
  );
  const params = new URLSearchParams(searchParams);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchClick = () => {
    params.set("page", "1");

    if (searchValue.length > 0) {
      params.set("query", searchValue);
      replace(`/search?${params.toString()}`);
      setIsSearchOpen && setIsSearchOpen(false);
    } else {
      params.delete("query");
    }
  };

  return (
    <div className={styleBase}>
      <div className={styleContainer}>
        <div className="relative col-span-11">
          <FaSearch size={18} className="absolute left-3 top-3 text-gray-500" />
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-12 text-xs md:text-sm placeholder:text-gray-500 text-gray-800 focus:outline-none focus:border-gray-500"
            placeholder="Rechercher un film, une série TV..."
            type="search"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            className="absolute right-0 top-0 z-10 bg-secondary p-2 rounded-md font-bold text-sm md:text-base"
            type="button"
            onClick={handleSearchClick}
          >
            Rechercher
          </button>
        </div>
        {searchValue.length > 0 && !isHeader && (
          <button
            type="button"
            className="w-fit"
            onClick={() => {
              setSearchValue("");
              params.delete("query");
            }}
          >
            <TiDelete size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
