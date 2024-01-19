import { People } from "@/models/people";
import { FC } from "react";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

type Props = {
  data: People;
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
