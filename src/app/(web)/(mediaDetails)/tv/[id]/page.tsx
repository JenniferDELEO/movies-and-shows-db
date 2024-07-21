import TvWrapper from "@/components/DetailsMedia/Tv/TvWrapper";
import { getTvDetail } from "@/libs/api/tvs";

const Tv = async ({ params }: { params: { id: string } }) => {
  const id = params.id.split("-")[0];
  const tvDetails = await getTvDetail(id);

  return (
    <div className="size-full">
      <TvWrapper
        tvDetails={tvDetails}
        tvUrl={params.id}
      />
    </div>
  );
};

export default Tv;
