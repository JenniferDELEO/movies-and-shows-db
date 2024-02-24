import { getEpisodeDetails } from "@/libs/api/tvs";
import {
  addEpisode,
  getAllEpisodesBySeasonId,
} from "@/libs/sanity/api/episode";
import { getAllSeasonsByTvId } from "@/libs/sanity/api/tv-season";
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
    const allSeasonsByTv = await getAllSeasonsByTvId(tvId);
    const sortedAllSeasonsByTv = allSeasonsByTv.sort(
      (a, b) => a.season_number - b.season_number,
    );

    for (let i = 0; i < sortedAllSeasonsByTv.length; i++) {
      const allEpisodesBySeason = await getAllEpisodesBySeasonId(
        allSeasonsByTv[i]._id,
      );
      const sortedAllEpisodesBySeason = allEpisodesBySeason.sort(
        (a, b) => a.episode_number - b.episode_number,
      );

      if (
        sortedAllEpisodesBySeason.length ===
        sortedAllSeasonsByTv[i].number_of_episodes
      )
        return new NextResponse("All episodes already exists", { status: 200 });

      const previousSeasonsEpisodesToAdd = sortedAllSeasonsByTv
        .slice(0, i - 1)
        .reduce((acc, season) => acc + season.number_of_episodes, 0);
      for (let j = 1; j <= sortedAllSeasonsByTv[i].number_of_episodes; j++) {
        const episodeExists = sortedAllEpisodesBySeason?.find(
          (episode) => episode.episode_number === j,
        );
        if (episodeExists) {
          return new NextResponse("Episode already exists", { status: 200 });
        } else {
          const episodeDetails = await getEpisodeDetails(
            tvTmdbId,
            sortedAllSeasonsByTv[i].season_number,
            j,
          );
          await addEpisode({
            episodeTitle: episodeDetails.name,
            episodeNumber: j,
            episodeTotalNumber: previousSeasonsEpisodesToAdd + j,
            seasonNumber: sortedAllSeasonsByTv[i].season_number,
            episodeReleaseDate: episodeDetails.air_date,
            episodeRuntime: episodeDetails.runtime,
            tmdbId: episodeDetails.id,
            tvId,
            seasonId: sortedAllSeasonsByTv[i]._id,
          });
        }
      }
    }
    return NextResponse.json({
      status: 200,
      statusText: "Successful",
    });
  } catch (error) {
    return new NextResponse("Unable to fetch", {
      status: 400,
      statusText: `Unable to fetch : ${error}`,
    });
  }
}
