import PeopleCard from "@/components/People/PeopleCard";
import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import { getCreditssMovies } from "@/libs/api/movies";
import CreditsWrapper from "@/components/DetailsMedia/Wrappers/CreditsWrapper";

type Props = {
  params: { id: string };
};

const Cast = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const results = await getCreditssMovies(id);
  const moviesCast = results.cast;
  const moviesCrew = results.crew;

  return (
    <div className="mx-auto size-full pt-[64px] md:w-[95%] lg:w-[90%]">
      <CreditsWrapper itemCastMovie={moviesCast} itemCrewMovie={moviesCrew} />
    </div>
  );
};

export default Cast;
