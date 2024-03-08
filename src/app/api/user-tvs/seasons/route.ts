import {
  addEpisodesByUserSeason,
  addUserSeason,
  createEpisodesByUserSeason,
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
    const userSeasonsByTv = await getUserSeasonsByTv(tvId, userId);

    if (allSeasonsByTv && allSeasonsByTv.length > 0) {
      for (let i = 0; i < allSeasonsByTv.length; i++) {
        const seasonExists = userSeasonsByTv?.find(
          (season) =>
            season.season.season_number === allSeasonsByTv[i].season_number,
        );
        let episodesToAdd = allSeasonsByTv[i].episodes.map((ep) => {
          return {
            episode: {
              id: ep.tmdb_id,
              season_number: ep.season_number,
              episode_number: ep.episode_number,
            },
            watched: false,
          };
        });
        if (seasonExists) {
          const numberOfEpisodesUser =
            seasonExists?.watched_episodes?.length || 0;
          const numberOfEpisodesSeason = allSeasonsByTv[i].episodes.length;

          if (numberOfEpisodesUser === numberOfEpisodesSeason) {
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
                    (e) => e.episode_number === ep.episode.episode_number,
                  ),
              );
              await addEpisodesByUserSeason({
                userSeasonId: seasonExists._id,
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
              await createEpisodesByUserSeason({
                userSeasonId: seasonExists._id,
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
