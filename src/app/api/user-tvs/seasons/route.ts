import {
  createUserSeasonAndStatus,
  getAllSeasonsByTvId,
  getUserSeasonsByTv,
} from "@/libs/sanity/api/tv-season";
import { authOptions } from "@/libs/sanity/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const { tvId } = await req.json();

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }

  const userId = session.user.id;
  const userName = session.user.name!;

  if (!userId && !userName) {
    return new NextResponse("User not found", { status: 404 });
  }

  try {
    const allSeasonsByTv = await getAllSeasonsByTvId(tvId);
    const sortedAllSeasonsByTv = allSeasonsByTv.sort(
      (a, b) => a.season_number - b.season_number,
    );
    const userSeasonsByTv = await getUserSeasonsByTv(tvId, userId);
    const sortedUserSeasonsByTv = userSeasonsByTv?.sort(
      (a, b) => a.season.season_number - b.season.season_number,
    );

    if (
      sortedUserSeasonsByTv &&
      sortedAllSeasonsByTv.length === userSeasonsByTv.length
    ) {
      return new NextResponse("User already has all seasons", { status: 200 });
    } else {
      for (let i = 0; i < sortedAllSeasonsByTv.length; i++) {
        const seasonExists = sortedUserSeasonsByTv?.find(
          (season) => season.season._id === sortedAllSeasonsByTv[i]._id,
        );
        if (!seasonExists) {
          await createUserSeasonAndStatus({
            userName,
            userId,
            tvId,
            seasonId: sortedAllSeasonsByTv[i]._id,
            allWatched: false,
          });
        }
      }
    }
    /*       const totalEpisodes = allSeasonsByTv.find(
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
      ); */

    /* let allWatched: boolean = false;
      if (filteredOldWatchedEpisodes && newWatchedEpisodes) {
        const watchedEpisodes = newWatchedEpisodes.concat(
          filteredOldWatchedEpisodes,
        );
        allWatched = watchedEpisodes.length === totalEpisodes.length;
      } else if (newWatchedEpisodes && !filteredOldWatchedEpisodes) {
        allWatched = newWatchedEpisodes.length === totalEpisodes.length;
      } else if (filteredOldWatchedEpisodes && !newWatchedEpisodes) {
        allWatched = filteredOldWatchedEpisodes.length === totalEpisodes.length;
      } else allWatched = false; */

    /* const episodes = episodesToAdd.map((episode) => ({
        episodeId: episode.episode_id,
        episodeNumber: episode.episode_number,
        watched: episode.watched,
      })); */

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
