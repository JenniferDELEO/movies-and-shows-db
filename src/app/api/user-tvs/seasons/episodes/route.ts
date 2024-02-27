import {
  createUserEpisodeAndStatus,
  getAllEpisodesByTvId,
  getUserEpisodesByTvId,
  updateUserEpisodeAndStatus,
} from "@/libs/sanity/api/episode";
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
    const allEpisodesByTv = await getAllEpisodesByTvId(tvId);
    const userEpisodesByTv = await getUserEpisodesByTvId(tvId, userId);

    if (
      userEpisodesByTv &&
      allEpisodesByTv.length === userEpisodesByTv.length
    ) {
      episodes.forEach(async (episode) => {
        const userEpisodeId = userEpisodesByTv.find(
          (userEpisode) => userEpisode.episode.tmdb_id === episode.episode.id,
        )?._id;
        if (userEpisodeId) {
          await updateUserEpisodeAndStatus({
            userEpisodeId,
            watched: episode.watched,
          });
        }
      });
    } else {
      episodes.forEach(async (episode) => {
        const episodeExists = userEpisodesByTv?.find(
          (userEpisode) => userEpisode.episode.tmdb_id === episode.episode.id,
        );
        if (episodeExists) {
          await updateUserEpisodeAndStatus({
            userEpisodeId: episodeExists._id,
            watched: episode.watched,
          });
        } else {
          const seasonId = allEpisodesByTv.find(
            (ep) =>
              ep.season_number === episode.episode.season_number &&
              ep.episode_number === episode.episode.episode_number,
          )?.season._id;
          const episodeId = allEpisodesByTv.find(
            (ep) =>
              ep.season_number === episode.episode.season_number &&
              ep.episode_number === episode.episode.episode_number,
          )?._id;
          if (seasonId && episodeId) {
            await createUserEpisodeAndStatus({
              userName,
              userId,
              tvId,
              seasonId,
              episodeId,
              watched: episode.watched,
            });
          }
        }
      });
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
