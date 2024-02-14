import { FC } from "react";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

import { CastMovies, CastTvShows } from "@/models/people";
import PeopleCard from "@/components/People/PeopleCard";

type Props = {
  castMovie?: CastMovies[];
  castTvShow?: CastTvShows[];
  mediaUrl: string;
  type: "tvShow" | "movie";
};

const CrewBanner: FC<Props> = (props) => {
  const { castMovie, castTvShow, mediaUrl, type } = props;

  return (
    <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
      <h1 className="mx-auto py-4 text-xl font-bold md:w-[90%]">
        Acteurs principaux
      </h1>
      <div className="mx-auto flex flex-row items-center overflow-x-auto md:w-[90%]">
        {type === "movie" &&
          castMovie &&
          castMovie.slice(0, 9).map((item) => (
            <div
              key={item.id}
              className="mx-2 my-4 max-h-[330px] min-w-[150px]"
            >
              <PeopleCard itemCastMovie={item} />
            </div>
          ))}
        {type === "tvShow" &&
          castTvShow &&
          castTvShow.slice(0, 9).map((item) => (
            <div
              key={item.id}
              className="mx-2 my-4 max-h-[350px] min-w-[150px]"
            >
              <PeopleCard itemCastTvShow={item} />
            </div>
          ))}
        <Link
          href={`/${type}/${mediaUrl}/cast`}
          className="mr-4 flex min-w-[120px] flex-row items-center justify-center px-2 hover:text-gray-400"
        >
          <p className="text-sm">Afficher davantage</p>
          <FaLongArrowAltRight className="text-sm" />
        </Link>
      </div>
      <div className="mx-auto py-4 text-lg md:w-[90%]">
        <Link
          href={`/${type}/${mediaUrl}/cast`}
          className="text-sm hover:text-gray-400 md:text-base"
        >
          Distribution des rôles et équipe technique au complet
        </Link>
      </div>
      <div className="mx-auto mb-0 mt-16 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
    </section>
  );
};

export default CrewBanner;
