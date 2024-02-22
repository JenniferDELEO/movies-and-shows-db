import {
  createUserTvAndStatus,
  getTvByTmdbId,
  getUserTvById,
  updateUserTvStatus,
} from "@/libs/sanity/api/tv";
import { authOptions } from "@/libs/sanity/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const { tmdbId, status, watchState } = await req.json();

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }
  const userId = session.user.id;
  const userName = session.user.name!;

  if (!userId && !userName) {
    return new NextResponse("User not found", { status: 400 });
  }

  try {
    const tv = await getTvByTmdbId(tmdbId);
    const tvId = tv._id;
    if (!tv) {
      return new NextResponse("Failed to retrieve tv", { status: 400 });
    }

    let data;

    const userHasTv = await getUserTvById(userId, tvId);
    if (userHasTv) {
      data = await updateUserTvStatus({
        userTvId: userHasTv._id,
        status,
        watchState,
      });
    } else {
      data = await createUserTvAndStatus({
        userId,
        userName,
        tvId,
        tvTitle: tv.title,
        status,
        watchState,
      });
    }

    return NextResponse.json(data, { status: 200, statusText: "Successful" });
  } catch (error) {
    return new NextResponse("Unable to fetch", {
      status: 400,
      statusText: `Unable to fetch : ${error}`,
    });
  }
}
