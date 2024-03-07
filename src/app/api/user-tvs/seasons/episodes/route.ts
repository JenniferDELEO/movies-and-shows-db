import {
  addEpisodesByUserSeason,
  addUserSeason,
  createEpisodesByUserSeason,
  getAllSeasonsByTvId,
  getUserSeasonsByTv,
  updateEpisodeUserSeasonStatus,
} from "@/libs/sanity/api/tv-season";
import { authOptions } from "@/libs/sanity/auth";
import { EpisodeFromUI } from "@/models/episode";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const {
    tvId,
    userEpisodesToAdd,
    userEpisodesToUpdate,
  }: {
    tvId: string;
    userEpisodesToAdd: EpisodeFromUI[];
    userEpisodesToUpdate: EpisodeFromUI[];
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
        if (seasonExists) {
          const episodesToAdd = userEpisodesToAdd.filter(
            (ep) =>
              ep.episode.season_number === allSeasonsByTv[i].season_number,
          );

          const episodesToUpdate = userEpisodesToUpdate.filter(
            (ep) =>
              ep.episode.season_number === allSeasonsByTv[i].season_number,
          );

          try {
            if (episodesToUpdate && episodesToUpdate.length > 0) {
              await updateEpisodeUserSeasonStatus({
                userSeasonId: seasonExists._id,
                episodes: episodesToUpdate,
              });
            }
            if (episodesToAdd && episodesToAdd.length > 0) {
              if (
                seasonExists.watched_episodes &&
                seasonExists.watched_episodes.length > 0
              ) {
                await addEpisodesByUserSeason({
                  userSeasonId: seasonExists._id,
                  episodes: episodesToAdd,
                });
              } else {
                await createEpisodesByUserSeason({
                  userSeasonId: seasonExists._id,
                  episodes: episodesToAdd,
                });
              }
            }
            if (!episodesToAdd && !episodesToUpdate) {
              return new NextResponse("All episodes already added or updated", {
                status: 200,
                statusText: "No episodes to add or update",
              });
            }
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
            await addUserSeason({
              userName,
              userId,
              tvId,
              seasonId: allSeasonsByTv[i]._id,
              episodes: userEpisodesToAdd,
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
