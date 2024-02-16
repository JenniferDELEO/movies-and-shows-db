import TvShowWrapper from "@/components/DetailsMedia/TvShow/TvShowWrapper";
import { getTvShowDetail } from "@/libs/api/tvShows";
import { getAllTvShows, getUserTvShows } from "@/libs/sanity/api/tvShow";
import { authOptions } from "@/libs/sanity/auth";
import { InternalTvShowAndUser } from "@/models/tvShows";
import { getServerSession } from "next-auth";

const Tvshow = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const id = params.id.split("-")[0];
  const tvShowDetails = await getTvShowDetail(id);

  let userTvShows: InternalTvShowAndUser[] = [];
  let userTvShowsId: string = "";
  if (session) {
    const results = await getUserTvShows(session.user.id);
    userTvShows = results?.tv_shows || [];
    userTvShowsId = results?._id;
  }

  const internalTvShows = await getAllTvShows();

  return (
    <div className="size-full">
      <TvShowWrapper
        tvShowDetails={tvShowDetails}
        tvShowUrl={params.id}
        internalTvShows={internalTvShows}
        userTvShows={userTvShows}
        userTvShowsId={userTvShowsId}
      />
    </div>
  );
};

export default Tvshow;
