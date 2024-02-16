import { getSeasonDetails, getTvDetail } from "@/libs/api/tvs";
import { addTvAndUser, getAllTvs, updateTvAndUser } from "@/libs/sanity/api/tv";
import { authOptions } from "@/libs/sanity/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const { tmdbId, title, releaseDate, genres, posterPath, overview } =
    await req.json();

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }

  const userId = session.user.id;

  try {
    let totalRuntime: number = 0;
    let data;
    const tvDetails = await getTvDetail(tmdbId);

    if (tvDetails) {
      const seasonDetails = await getSeasonDetails(tmdbId, 1);
      const numberOfSeasons = tvDetails.number_of_seasons;
      const numberOfEpisodes = tvDetails.number_of_episodes;
      const episodeRuntime = seasonDetails.episodes[0].runtime;

      totalRuntime = numberOfEpisodes * episodeRuntime;

      const allTvs = await getAllTvs();
      const tvExists = allTvs.find((tv) => tv.tmdb_id === Number(tmdbId));

      if (tvExists) {
        const checkUserExists = tvExists.users.find(
          (user) => user._ref === userId,
        );
        if (checkUserExists) {
          return new NextResponse("User already exists", { status: 200 });
        } else {
          data = await updateTvAndUser({
            tvId: tvExists._id,
            userId,
          });
        }
      } else {
        data = await addTvAndUser({
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
