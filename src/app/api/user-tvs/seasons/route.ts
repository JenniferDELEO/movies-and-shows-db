import {
  addUserSeasonAndStatus,
  createUserSeasonAndStatus,
  getAllSeasonsByTv,
  getUserSeasonsByTv,
  updateUserEpisodeAndStatus,
} from "@/libs/sanity/api/tv-season";
import { authOptions } from "@/libs/sanity/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const {
    tvId,
    seasons,
  }: {
    tvTmdbId: number;
    tvId: string;
    seasons: {
      seasonNumber: number;
      episodes: {
        episode_id: string;
        episode_number: number;
        watched: boolean;
      }[];
    }[];
  } = await req.json();

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }

  const userId = session.user.id;

  try {
    const allSeasonsByTv = await getAllSeasonsByTv(tvId);
    const userSeasonsByTv = await getUserSeasonsByTv(tvId, userId);

    for (let i = 0; i < seasons.length; i++) {
      const seasonId = allSeasonsByTv.find(
        (season) => season.season_number === seasons[i].seasonNumber,
      )?._id;

      if (!seasonId) {
        return new NextResponse("Failed to retrieve season id", {
          status: 404,
        });
      }

      const totalEpisodes = allSeasonsByTv.find(
        (season) => season.season_number === seasons[i].seasonNumber,
      )?.episodes;

      if (!totalEpisodes) {
        return new NextResponse("Failed to retrieve episodes", { status: 404 });
      }

      const episodesToAdd = seasons[i].episodes;
      const newWatchedEpisodes = episodesToAdd.filter(
        (episode) => episode.watched,
      );
      const oldEpisodes = userSeasonsByTv?.seasons?.find(
        (season) => season.season.season_number === seasons[i].seasonNumber,
      )?.account_states?.episodes;
      const oldWatchedEpisodes = oldEpisodes?.filter(
        (episode) => episode.watched,
      );
      const filteredOldWatchedEpisodes = oldWatchedEpisodes?.filter(
        (episode) =>
          !newWatchedEpisodes?.find(
            (newEpisode) => newEpisode.episode_id === episode.episode_id,
          ),
      );

      let allWatched: boolean = false;
      if (filteredOldWatchedEpisodes && newWatchedEpisodes) {
        const watchedEpisodes = newWatchedEpisodes.concat(
          filteredOldWatchedEpisodes,
        );
        allWatched = watchedEpisodes.length === totalEpisodes.length;
      } else if (newWatchedEpisodes && !filteredOldWatchedEpisodes) {
        allWatched = newWatchedEpisodes.length === totalEpisodes.length;
      } else if (filteredOldWatchedEpisodes && !newWatchedEpisodes) {
        allWatched = filteredOldWatchedEpisodes.length === totalEpisodes.length;
      } else allWatched = false;

      const episodes = episodesToAdd.map((episode) => ({
        episodeId: episode.episode_id,
        episodeNumber: episode.episode_number,
        watched: episode.watched,
      }));

      if (userSeasonsByTv) {
        const seasonExists = userSeasonsByTv.seasons.find(
          (season) => season.season.season_number === seasons[i].seasonNumber,
        );
        const userSeasonsId = userSeasonsByTv._id;
        if (seasonExists) {
          await updateUserEpisodeAndStatus({
            userSeasonsId,
            seasonId,
            allWatched,
            episodes,
          });
        } else {
          await addUserSeasonAndStatus({
            userSeasonsId,
            seasonId,
            allWatched,
            episodes,
          });
        }
      } else {
        await createUserSeasonAndStatus({
          userId,
          tvId,
          seasonId,
          allWatched,
          episodes,
        });
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
