import TvShowWrapper from "@/components/DetailsMedia/TvShow/TvShowWrapper";
import { getTvShowDetail } from "@/libs/api/tvShows";

const Tvshow = async ({ params }: { params: { id: string } }) => {
  const id = params.id.split("-")[0];
  const tvShowDetails = await getTvShowDetail(id);

  return (
    <div className="size-full">
      <TvShowWrapper tvShowDetails={tvShowDetails} tvShowUrl={params.id} />
    </div>
  );
};

export default Tvshow;
