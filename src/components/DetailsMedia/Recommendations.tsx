import { Movie } from "@/models/movies";
import { FC } from "react";
import BannerWrapper from "../Banner/BannerWrapper";

type Props = {
  recommendations: Movie[];
  totalResults: number;
};

const Recommendations: FC<Props> = (props) => {
  const { recommendations, totalResults } = props;
  return (
    <section className="p-4 md:px-[2.5%] lg:px-[5%] 2xl:px-[12%]">
      <BannerWrapper
        movieDetailsProps={{
          movies: recommendations,
          title: "Recommendations",
          totalResults,
        }}
      />
      <div className="mx-auto mb-10 mt-12 h-[2px] w-full bg-gray-400" />
    </section>
  );
};

export default Recommendations;
