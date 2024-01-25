import { Cast } from "@/models/people";
import { FC } from "react";
import PeopleCard from "../People/PeopleCard";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

type Props = {
  cast: Cast[];
  movieUrl: string;
};

const CrewBanner: FC<Props> = (props) => {
  const { cast, movieUrl } = props;
  return (
    <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
      <h1 className="mx-auto py-4 text-xl font-bold md:w-[90%]">
        Acteurs principaux
      </h1>
      <div className="mx-auto flex flex-row items-center overflow-x-auto md:w-[90%]">
        {cast.slice(0, 9).map((item) => (
          <div key={item.id} className="mx-2 my-4 max-h-[330px] min-w-[120px]">
            <PeopleCard itemCastAndCrew={item} />
          </div>
        ))}
        <Link
          href={`/movie/${movieUrl}/cast`}
          className="mr-4 flex min-w-[120px] flex-row items-center justify-center px-2 hover:text-gray-400"
        >
          <p className="text-sm">Afficher davantage</p>
          <FaLongArrowAltRight className="text-sm" />
        </Link>
      </div>
      <div className="mx-auto py-4 text-lg md:w-[90%]">
        <Link href={`/movie/${movieUrl}/cast`} className="hover:text-gray-400">
          Distribution des rôles et équipe technique au complet
        </Link>
      </div>
      <div className="mx-auto mb-0 mt-16 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
    </section>
  );
};

export default CrewBanner;
