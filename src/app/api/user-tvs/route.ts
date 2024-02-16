import {
  addUserTvStatus,
  createUserTvAndStatus,
  getAllTvs,
  getUserTvs,
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

  try {
    const allTvs = await getAllTvs();
    const tvId = allTvs.find((movie) => movie.tmdb_id === Number(tmdbId))?._id;
    if (!tvId) {
      return new NextResponse("Failed to retrieve tv Id", { status: 400 });
    }

    const userTvs = await getUserTvs(userId);

    let data;

    if (userTvs) {
      const tvExists = userTvs.tvs.find(
        (tv) => tv.tv.tmdb_id === Number(tmdbId),
      );
      if (tvExists) {
        data = await updateUserTvStatus({
          userTvId: userTvs._id,
          tvId,
          status,
          watchState,
        });
      } else {
        data = await addUserTvStatus({
          userTvId: userTvs._id,
          tvId,
          status,
          watchState,
        });
      }
    } else {
      data = await createUserTvAndStatus({
        tvId,
        userId,
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
