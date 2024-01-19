/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { People } from "@/models/people";
import Pagination from "../Pagination/Pagination";
import React, { FC, useEffect, useState } from "react";
import PeopleCard from "./PeopleCard";
import { usePathname } from "next/navigation";
import { getPopularPeople } from "@/libs/api/people";

type Props = {
  people: People[];
  totalPagesPeople: number;
  totalResultsPeople: number;
};

const PeopleList: FC<Props> = (props) => {
  const { people, totalPagesPeople, totalResultsPeople } = props;
  const pathname = usePathname();
  const [peopleList, setPeopleList] = useState<People[]>(people);
  const [currentPage, setCurrentPage] = useState(
    pathname.split("/")[2] ? parseInt(pathname.split("/")[2]) : 1,
  );

  async function getPeopleNextPages() {
    const result = await getPopularPeople(currentPage);
    setPeopleList(result.results);
  }

  useEffect(() => {
    if (currentPage > 1) {
      getPeopleNextPages();
    }
  }, [currentPage]);

  return (
    <div>
      {!people ? (
        <div className="text-center text-lg md:text-xl">Chargement...</div>
      ) : (
        <div>
          <h3 className="mx-4 my-6 text-lg lg:text-xl">
            Liste des artistes triés par popularité{" "}
            <span className="text-xs font-bold md:text-lg">
              ({totalResultsPeople})
            </span>
          </h3>
          <div className="mx-auto grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 xl:gap-4">
            {peopleList.map((item) => (
              <PeopleCard key={item.id} item={item} />
            ))}
          </div>
          <Pagination
            total={totalPagesPeople}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default PeopleList;
