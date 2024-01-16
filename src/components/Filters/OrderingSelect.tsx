"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

const OrderingSelect = () => {
  const [filterType, setFilterType] = useState("popularity.desc");
  const orderingOptions = [
    { title: "Popularité + / -", value: "popularity.desc" },
    { title: "Popularité - / +", value: "popularity.asc" },
    { title: "Note moyenne + / -", value: "vote_average.desc" },
    { title: "Note moyenne - / +", value: "vote_average.asc" },
    { title: "Date de sortie + / -", value: "primary_release_date.desc" },
    { title: "Date de sortie - / +", value: "primary_release_date.asc" },
  ];

  const handleSelectionChange = (e: any) => {
    setFilterType(e.target.value);
  };

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
