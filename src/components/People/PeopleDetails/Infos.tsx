import { FC } from "react";

import { Person } from "@/models/people";
import LeftContent from "@/components/People/PeopleDetails/LeftContent";
import RightContent from "@/components/People/PeopleDetails/RightContent";

type Props = {
  data: Person;
};

const Infos: FC<Props> = ({ data }) => {
  return (
    <div className="mx-4 lg:mx-0">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
        <LeftContent data={data} />
        <RightContent data={data} />
      </div>
    </div>
  );
};

export default Infos;
