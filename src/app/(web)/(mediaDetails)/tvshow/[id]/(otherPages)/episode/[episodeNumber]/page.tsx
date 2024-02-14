import EpisodeWrapper from "@/components/DetailsMedia/TvShow/EpisodeWrapper";
import {
  getEpisodeDetails,
  getSeasonDetails,
  getTvShowDetail,
} from "@/libs/api/tvShows";

type Props = {
  params: { id: string; episodeNumber: string };
};

const Episode = async ({ params }: Props) => {
  const tvShowId = Number(params.id.split("-")[0]);
  const seasonNumber = Number(
    params.episodeNumber.replace(/\D+/g, "").slice(0, 2),
  );
  const episodeNumber = Number(
    params.episodeNumber.replace(/\D+/g, "").slice(2),
  );

  const episodeDetails = await getEpisodeDetails(
    tvShowId,
    seasonNumber,
    episodeNumber,
  );
  const seasonDetails = await getSeasonDetails(tvShowId, seasonNumber);
  const seasonPrecedentDetails =
    seasonNumber > 1
      ? await getSeasonDetails(tvShowId, seasonNumber - 1)
      : undefined;
  const tvShowDetails = await getTvShowDetail(tvShowId.toString());

  return (
    <div>
      <EpisodeWrapper
        episodeDetails={episodeDetails}
        episodeNumber={episodeNumber}
        seasonPrecedentDetails={seasonPrecedentDetails}
        seasonDetails={seasonDetails}
        seasonNumber={seasonNumber}
        tvShowDetails={tvShowDetails}
        tvShowId={tvShowId}
      />
    </div>
  );
};

export default Episode;
