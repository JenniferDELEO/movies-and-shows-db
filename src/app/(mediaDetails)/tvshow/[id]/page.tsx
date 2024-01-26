import TvShowWrapper from "@/components/DetailsMedia/TvShow/TvShowWrapper";
import { getTvShowDetail } from "@/libs/api/tvshows";

const Tvshow = async ({ params }: { params: { id: string } }) => {
  const tvShowDetail = await getTvShowDetail(params.id.split("-")[0]);

  return (
    <div className="size-full">
      <TvShowWrapper tvShowDetail={tvShowDetail} tvShowUrl={params.id} />
    </div>
  );
};

export default Tvshow;
