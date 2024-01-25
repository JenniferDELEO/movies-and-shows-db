import { Movie } from "@/models/movies";
import { FC } from "react";
import BannerWrapper from "../Banner/BannerWrapper";

type Props = {
  similars: Movie[];
  totalPages: number;
};

const Similar: FC<Props> = (props) => {
  const { similars, totalPages } = props;
  return (
    <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[10%]">
      <BannerWrapper
        movieDetailsProps={{
          movies: similars,
          title: "Films similaires",
          totalPages,
        }}
      />
      <div className="mx-auto mb-0 h-[2px] w-full bg-gray-400 lg:w-[90%]" />
    </section>
  );
};

export default Similar;
