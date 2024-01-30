import TvShowWrapper from "@/components/DetailsMedia/TvShow/TvShowWrapper";
import { getTvShowDetail } from "@/libs/api/tvshows";

const Tvshow = async ({ params }: { params: { id: string } }) => {
  const id = params.id.split("-")[0];
  const tvShowDetail = await getTvShowDetail(id);

  return (
    <div className="size-full">
      <TvShowWrapper tvShowDetail={tvShowDetail} tvShowUrl={params.id} />
    </div>
  );
};

export default Tvshow;
