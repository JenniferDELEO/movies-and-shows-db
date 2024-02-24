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
    const sortedAllEpisodesByTv = allEpisodesByTv.sort(
      (a, b) => a.episode_number - b.episode_number,
    );
    const userEpisodesByTv = await getUserEpisodesByTvId(tvId, userId);
    const sortedUserEpisodesByTv = userEpisodesByTv?.sort(
      (a, b) => a.episode.episode_number - b.episode.episode_number,
    );

    if (
      sortedUserEpisodesByTv &&
      sortedAllEpisodesByTv.length === sortedUserEpisodesByTv.length
    ) {
      episodes.forEach(async (episode) => {
        const userEpisodeId = sortedUserEpisodesByTv.find(
          (userEpisode) => userEpisode.episode._id === episode.episode._id,
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
        const episodeExists = sortedUserEpisodesByTv?.find(
          (userEpisode) => userEpisode.episode._id === episode.episode._id,
        );
        if (episodeExists) {
          await updateUserEpisodeAndStatus({
            userEpisodeId: episodeExists._id,
            watched: episode.watched,
          });
        } else {
          await createUserEpisodeAndStatus({
            userName,
            userId,
            tvId,
            seasonId: episode.episode.season._id,
            episodeId: episode.episode._id,
            watched: episode.watched,
          });
        }
      });
    }
  } catch (error) {
    return new NextResponse("Unable to fetch", {
      status: 400,
      statusText: `Unable to fetch : ${error}`,
    });
  }
}
