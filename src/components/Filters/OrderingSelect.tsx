"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { Filters as FiltersType } from "@/models/filters";

type Props = {
  filterType: string;
  handleSelectionChange: (e: ChangeEvent<HTMLSelectElement>) => Promise<void>;
};

const OrderingSelect: FC<Props> = (props) => {
  const { filterType, handleSelectionChange } = props;

  const orderingOptions = [
    { title: "Popularité + / -", value: "popularity.desc" },
    { title: "Popularité - / +", value: "popularity.asc" },
    { title: "Note moyenne + / -", value: "vote_average.desc" },
    { title: "Note moyenne - / +", value: "vote_average.asc" },
    { title: "Date de sortie + / -", value: "primary_release_date.desc" },
    { title: "Date de sortie - / +", value: "primary_release_date.asc" },
    { title: "Titre (de A à Z)", value: "original_title.asc" },
    { title: "Titre (de Z à A)", value: "original_title.desc" },
  ];

  return (
    <Select
      variant="underlined"
      className="max-w-[180px]"
      label="Sélection ordre"
      selectedKeys={[filterType]}
      onChange={handleSelectionChange}
      classNames={{
        label: "hidden",
        selectorIcon: "mt-4",
        listboxWrapper: "min-w-[190px]",
      }}
    >
      {orderingOptions.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.title}
        </SelectItem>
      ))}
    </Select>
  );
};

export default OrderingSelect;
