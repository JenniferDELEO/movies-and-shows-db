import { getSeasonDetails, getTvDetailForDb } from "@/libs/api/tvs";
import {
  addSeason,
  getAllSeasonsByTv,
  updateSeason,
} from "@/libs/sanity/api/tv-season";
import { authOptions } from "@/libs/sanity/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const { tvTmdbId, tvId } = await req.json();

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }

  try {
    const tvDetails = await getTvDetailForDb(tvTmdbId);

    if (tvDetails) {
      for (let i = 1; i <= tvDetails.number_of_seasons; i++) {
        const allSeasonsByTv = await getAllSeasonsByTv(tvId);
        const seasonExists = allSeasonsByTv.find(
          (season) => season.season_number === i,
        );

        const seasonDetails = await getSeasonDetails(tvTmdbId, i);
        const previousSeasonsEpisodesToAdd = tvDetails.seasons
          .filter((season) => season.season_number !== 0)
          .slice(0, i - 1)
          .reduce((acc, season) => acc + season.episode_count, 0);

        if (seasonExists) {
          const numberOfEpisodesDb = seasonExists.episodes.length;
          const numberOfEpisodesApi = seasonDetails.episodes.length;

          if (numberOfEpisodesDb !== numberOfEpisodesApi) {
            const episodesToAdd =
              seasonDetails.episodes.slice(numberOfEpisodesDb);

            await updateSeason({
              seasonId: seasonExists._id,
              tmdbId: seasonDetails.id,
              episodes: episodesToAdd.map((episode) => ({
                episodeName: episode.name,
                episodeNumber: episode.episode_number,
                episodeReleaseDate: episode.air_date,
                episodeRuntime: episode.runtime,
                episodeTotalNumber:
                  i === 1
                    ? episode.episode_number
                    : previousSeasonsEpisodesToAdd + episode.episode_number,
              })),
            });
          }
        } else {
          await addSeason({
            tmdbId: seasonDetails.id,
            tvId,
            numberOfEpisodes: seasonDetails.episodes.length,
            releaseDate: seasonDetails.air_date,
            seasonNumber: i,
            episodes: seasonDetails.episodes.map((episode) => ({
              episodeName: episode.name,
              episodeNumber: episode.episode_number,
              episodeReleaseDate: episode.air_date,
              episodeRuntime: episode.runtime,
              episodeTotalNumber:
                i === 1
                  ? episode.episode_number
                  : previousSeasonsEpisodesToAdd + episode.episode_number,
            })),
          });
        }
      }
      return NextResponse.json({
        status: 200,
        statusText: "Successful",
      });
    }
  } catch (error) {
    return new NextResponse("Unable to fetch", {
      status: 400,
      statusText: `Unable to fetch : ${error}`,
    });
  }
}
