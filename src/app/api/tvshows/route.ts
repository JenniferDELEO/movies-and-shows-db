import { getSeasonDetails, getTvShowDetail } from "@/libs/api/tvShows";
import {
  addTvShowAndUser,
  getAllTvShows,
  updateTvShowAndUser,
} from "@/libs/sanity/api/tvShow";
import { authOptions } from "@/libs/sanity/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const {
    tmdbId,
    title,
    numberOfSeasons,
    numberOfEpisodes,
    releaseDate,
    genres,
    posterPath,
    overview,
  } = await req.json();

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }

  const userId = session.user.id;

  try {
    let totalRuntime: number = 0;
    let data;
    const tvShowDetails = await getTvShowDetail(tmdbId);

    if (tvShowDetails) {
      const seasonDetails = await getSeasonDetails(tmdbId, 1);
      const totalEpisodes = tvShowDetails.number_of_episodes;
      const episodeRuntime = seasonDetails.episodes[0].runtime;

      totalRuntime = totalEpisodes * episodeRuntime;

      const allTvShows = await getAllTvShows();
      const tvShowExists = allTvShows.find(
        (tvShow) => tvShow.tmdb_id === Number(tmdbId),
      );

      if (tvShowExists) {
        const checkUserExists = tvShowExists.users.find(
          (user) => user._ref === userId,
        );
        if (checkUserExists) {
          return new NextResponse("User already exists", { status: 200 });
        } else {
          data = await updateTvShowAndUser({
            tvShowId: tvShowExists._id,
            userId,
          });
        }
      } else {
        data = await addTvShowAndUser({
          tmdbId: Number(tmdbId),
          title,
          numberOfSeasons,
          numberOfEpisodes,
          releaseDate,
          totalRuntime,
          genres,
          posterPath,
          overview,
          userId,
        });
      }
      return NextResponse.json(data, { status: 200, statusText: "Successful" });
    }
  } catch (error) {
    return new NextResponse("Unable to fetch", {
      status: 400,
      statusText: `Unable to fetch : ${error}`,
    });
  }
}
