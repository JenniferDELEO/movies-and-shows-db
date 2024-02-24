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

    if (userSeasonsByTv && userSeasonsByTv.length > 0) {
      const sortedUserSeasonsByTv = userSeasonsByTv?.sort(
        (a, b) => a.season.season_number - b.season.season_number,
      );

      if (
        sortedUserSeasonsByTv &&
        sortedAllSeasonsByTv.length === userSeasonsByTv.length
      ) {
        return new NextResponse("User already has all seasons", {
          status: 200,
        });
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
