import type { Metadata } from "next";

import BannerWrapper from "@/components/Banner/BannerWrapper";
import Infos from "@/components/People/PeopleDetails/Infos";
import { getPeopleDetail } from "@/libs/api/people";
import { Movie } from "@/models/movies";
import { Tv } from "@/models/tvs";

type Props = {
  params: { id: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id[0];

  const peopleDetail = await getPeopleDetail(id);

  return {
    title: `${peopleDetail.name} - Films & Séries TV DB`
  };
}

const Person = async ({ params }: Props) => {
  const id = params.id[0];

  const peopleDetail = await getPeopleDetail(id);

  const actingMovies: Movie[] = peopleDetail?.movie_credits?.cast;
  const runningMovies: Movie[] = peopleDetail?.movie_credits?.crew;
  const actingTvs: Tv[] = peopleDetail?.tv_credits?.cast;
  const runningTvs: Tv[] = peopleDetail?.tv_credits?.crew;

  return (
    <div className="mx-auto w-full md:w-[95%] lg:w-[90%]">
      <Infos data={peopleDetail} />
      <BannerWrapper
        personDetailProps={{
          actingMovies,
          runningMovies,
          actingTvs,
          runningTvs
        }}
      />
    </div>
  );
};

export default Person;
