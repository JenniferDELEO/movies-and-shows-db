import { getCreditsMovie } from "@/libs/api/movies";
import CreditsWrapper from "@/components/DetailsMedia/Wrappers/CreditsWrapper";

type Props = {
  params: { id: string };
};

const Cast = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const results = await getCreditsMovie(id);
  const moviesCast = results.cast;
  const moviesCrew = results.crew;

  return (
    <div className="mx-auto size-full pt-[64px] md:w-[95%] lg:w-[90%]">
      <CreditsWrapper itemCastMovie={moviesCast} itemCrewMovie={moviesCrew} />
    </div>
  );
};

export default Cast;
