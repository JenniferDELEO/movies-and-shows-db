import TvWrapper from "@/components/DetailsMedia/Tv/TvWrapper";
import { getTvDetail } from "@/libs/api/tvs";
import { getAllTvs, getUserTvs } from "@/libs/sanity/api/tv";
import { authOptions } from "@/libs/sanity/auth";
import { InternalTvAndUser } from "@/models/tvs";
import { getServerSession } from "next-auth";

const Tv = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const id = params.id.split("-")[0];
  const tvDetails = await getTvDetail(id);

  let userTvs: InternalTvAndUser[] = [];

  if (session) {
    userTvs = await getUserTvs(session.user.id);
  }

  const internalTvs = await getAllTvs();

  return (
    <div className="size-full">
      <TvWrapper
        tvDetails={tvDetails}
        tvUrl={params.id}
        internalTvs={internalTvs}
        userTvs={userTvs}
      />
    </div>
  );
};

export default Tv;
