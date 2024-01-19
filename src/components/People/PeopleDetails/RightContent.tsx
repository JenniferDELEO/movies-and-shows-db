import { People } from "@/models/people";
import { FC } from "react";

type Props = {
  data: People;
};

const RightContent: FC<Props> = ({ data }) => {
  return (
    <div className="mt-4 flex flex-col items-center justify-center border-b py-4 md:w-[55%] md:items-start md:border-none lg:w-[65%] xl:w-[70%]">
      <h1 className="mt-4 hidden text-2xl font-bold lg:inline lg:text-3xl">
        {data.name}
      </h1>
      <h2 className="mt-4 text-lg font-bold lg:text-xl">Biographie</h2>
      {data?.biography ? (
        data.biography.split("\n").map((item, index) => (
          <p className="my-4 text-base text-gray-400 lg:text-lg" key={index}>
            {item}
          </p>
        ))
      ) : (
        <p className="my-4 text-base text-gray-400 lg:text-lg">Non renseigné</p>
      )}
    </div>
  );
};

export default RightContent;
