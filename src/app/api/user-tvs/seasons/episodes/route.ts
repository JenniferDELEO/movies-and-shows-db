import {
  addEpisodesByUserSeason,
  addUserSeason,
  getAllSeasonsByTvId,
  getUserSeasonsByTv,
  updateEpisodeUserSeasonStatus,
  updateEpisodesByUserSeason,
} from "@/libs/sanity/api/tv-season";
import { authOptions } from "@/libs/sanity/auth";
import { EpisodeFromUI } from "@/models/episode";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const {
    tvId,
    episodes,
  }: {
    tvId: string;
    episodes: EpisodeFromUI[];
  } = await req.json();

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
    const userSeasonsByTv = await getUserSeasonsByTv(tvId, userId);

    if (allSeasonsByTv && allSeasonsByTv.length > 0) {
      for (let i = 0; i < allSeasonsByTv.length; i++) {
        const seasonExists = userSeasonsByTv?.find(
          (season) =>
            season.season.season_number === allSeasonsByTv[i].season_number,
        );
        let episodesToAdd = episodes
          .filter(
            (episode) =>
              episode.episode.season_number === allSeasonsByTv[i].season_number,
          )
          .map((ep) => ({
            tmdbId: ep.episode.id,
            seasonNumber: ep.episode.season_number,
            episodeNumber: ep.episode.episode_number,
            watched: ep.watched,
          }));
        const allWatched =
          episodesToAdd.filter((episode) => episode.watched)?.length ===
          episodesToAdd.length;
        if (seasonExists) {
          const numberOfEpisodesUser =
            seasonExists?.watched_episodes?.length || 0;
          const numberOfEpisodesSeason = allSeasonsByTv[i].episodes.length;

          if (numberOfEpisodesUser === numberOfEpisodesSeason) {
            if (allWatched) {
              try {
                await updateEpisodeUserSeasonStatus({
                  userSeasonId: seasonExists._id,
                  allWatched,
                  episodes: episodesToAdd,
                });
              } catch (error: any) {
                console.log(error.response.data);
                return new NextResponse("Unable to update season status", {
                  status: 400,
                  statusText: `Unable to update season status: ${error}`,
                });
              }
            }
            if (seasonExists.season.season_number === allSeasonsByTv.length) {
              return new NextResponse(
                "Season and episodes of the user already exist",
                {
                  status: 200,
                },
              );
            } else {
              continue;
            }
          } else if (numberOfEpisodesUser > 0) {
            try {
              episodesToAdd = episodesToAdd.filter(
                (ep) =>
                  !seasonExists?.watched_episodes?.find(
                    (e) => e.episode_number === ep.episodeNumber,
                  ),
              );
              await updateEpisodesByUserSeason({
                userSeasonId: seasonExists._id,
                allWatched,
                episodes: episodesToAdd,
              });
            } catch (error: any) {
              console.log(error.response.data);
              return new NextResponse(
                "Unable to update season with new episodes to the user",
                {
                  status: 400,
                  statusText: `Unable to update season with new episodes to the user : ${error}`,
                },
              );
            }
          } else {
            try {
              await addEpisodesByUserSeason({
                userSeasonId: seasonExists._id,
                allWatched,
                episodes: episodesToAdd,
              });
            } catch (error: any) {
              console.log(error.response.data);
              return new NextResponse(
                "Unable to add episodes to the user's season",
                {
                  status: 400,
                  statusText: `Unable to add episodes to the user's season : ${error}`,
                },
              );
            }
          }
        } else {
          try {
            await addUserSeason({
              userName,
              userId,
              tvId,
              seasonId: allSeasonsByTv[i]._id,
              allWatched,
              episodes: episodesToAdd,
            });
          } catch (error: any) {
            console.log(error.response.data);
            return new NextResponse("Unable to add season to the user", {
              status: 400,
              statusText: `Unable to add season to the user : ${error}`,
            });
          }
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
