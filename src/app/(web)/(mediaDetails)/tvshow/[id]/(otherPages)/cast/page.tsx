import CreditsWrapper from "@/components/DetailsMedia/Wrappers/CreditsWrapper";
import { getCreditsTvShow } from "@/libs/api/tvshows";

type Props = {
  params: { id: string };
};

const Cast = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const results = await getCreditsTvShow(id);
  const tvShowsCast = results.cast;
  const tvShowsCrew = results.crew;

  return (
    <div className="mx-auto size-full pt-[64px] md:w-[95%] lg:w-[90%]">
      <CreditsWrapper
        itemCastTvShow={tvShowsCast}
        itemCrewTvShow={tvShowsCrew}
      />
    </div>
  );
};

export default Cast;
