"use client";

import React from "react";
import FiltersWrapper from "./FiltersWrapper";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";

const Filters = () => {
  return (
    <div className="hidden lg:mr-4 lg:block lg:w-[25%]">
      <FiltersWrapper>
        <Listbox aria-label="Actions">
          <ListboxSection showDivider>
            <ListboxItem
              key="movie"
              /* classNames={{
              base: `${filterType === "movie" ? "bg-[#3B393F]" : ""}`,
              title: `${filterType === "movie" ? "font-bold" : ""}`,
            }} */
            >
              Films
            </ListboxItem>
          </ListboxSection>
          <ListboxSection>
            <ListboxItem
              key="tv"
              /* classNames={{
              base: `${filterType === "tv" ? "bg-[#3B393F]" : ""}`,
              title: `${filterType === "tv" ? "font-bold" : ""}`,
            }} */
            >
              Séries TV
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </FiltersWrapper>
    </div>
  );
};

export default Filters;
