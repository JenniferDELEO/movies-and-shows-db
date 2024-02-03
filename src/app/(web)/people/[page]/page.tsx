import type { Metadata } from "next";

import PeopleList from "@/components/People/PeopleList";
import { getPopularPeople } from "@/libs/api/people";

export const metadata: Metadata = {
  title: "Artistes - Films & Séries TV DB",
};

const People = async () => {
  const {
    results: people,
    total_pages: totalPagesPeople,
    total_results: totalResultsPeople,
  } = await getPopularPeople(1);

  return (
    <PeopleList
      people={people}
      totalPagesPeople={totalPagesPeople}
      totalResultsPeople={totalResultsPeople}
    />
  );
};

export default People;
