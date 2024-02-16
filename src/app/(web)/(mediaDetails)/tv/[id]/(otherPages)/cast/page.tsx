import CreditsWrapper from "@/components/DetailsMedia/Wrappers/CreditsWrapper";
import { getCreditsTv } from "@/libs/api/tvs";

type Props = {
  params: { id: string };
};

const Cast = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const results = await getCreditsTv(id);
  const tvsCast = results.cast;
  const tvsCrew = results.crew;

  return (
    <div className="mx-auto size-full pt-[64px] md:w-[95%] lg:w-[90%]">
      <CreditsWrapper itemCastTv={tvsCast} itemCrewTv={tvsCrew} />
    </div>
  );
};

export default Cast;
