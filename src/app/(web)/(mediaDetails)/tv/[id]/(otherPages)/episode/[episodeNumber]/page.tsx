import EpisodeWrapper from "@/components/DetailsMedia/Tv/EpisodeWrapper";
import {
  getEpisodeDetails,
  getSeasonDetails,
  getTvDetail,
} from "@/libs/api/tvs";
import { getUserTvs } from "@/libs/sanity/api/tv";
import { authOptions } from "@/libs/sanity/auth";
import { InternalTvAndUser } from "@/models/tvs";
import { getServerSession } from "next-auth";

type Props = {
  params: { id: string; episodeNumber: string };
};

const Episode = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const tvId = Number(params.id.split("-")[0]);
  const seasonNumber = Number(
    params.episodeNumber.replace(/\D+/g, "").slice(0, 2),
  );
  const episodeNumber = Number(
    params.episodeNumber.replace(/\D+/g, "").slice(2),
  );

  let userTvs: InternalTvAndUser[] = [];

  if (session) {
    const results = await getUserTvs(session.user.id);
    userTvs = results?.tvs || [];
  }

  const episodeDetails = await getEpisodeDetails(
    tvId,
    seasonNumber,
    episodeNumber,
  );
  const seasonDetails = await getSeasonDetails(tvId, seasonNumber);
  const seasonPrecedentDetails =
    seasonNumber > 1
      ? await getSeasonDetails(tvId, seasonNumber - 1)
      : undefined;
  const tvDetails = await getTvDetail(tvId.toString());

  return (
    <div>
      <EpisodeWrapper
        episodeDetails={episodeDetails}
        episodeNumber={episodeNumber}
        seasonPrecedentDetails={seasonPrecedentDetails}
        seasonDetails={seasonDetails}
        seasonNumber={seasonNumber}
        tvDetails={tvDetails}
        tvId={tvId}
        userTvs={userTvs}
      />
    </div>
  );
};

export default Episode;
