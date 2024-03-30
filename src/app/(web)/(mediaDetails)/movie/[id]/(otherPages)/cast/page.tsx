import { getCreditsMovie } from "@/libs/api/movies";
import CreditsWrapper from "@/components/DetailsMedia/Wrappers/CreditsWrapper";
import { Suspense } from "react";
import LoadingSpinner from "@/app/(web)/loading";

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
      <Suspense fallback={<LoadingSpinner />}>
        <CreditsWrapper itemCastMovie={moviesCast} itemCrewMovie={moviesCrew} />
      </Suspense>
    </div>
  );
};

export default Cast;
