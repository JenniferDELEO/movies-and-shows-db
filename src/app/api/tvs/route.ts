import { getSeasonDetails, getTvDetail } from "@/libs/api/tvs";
import { addTv, getAllTvs } from "@/libs/sanity/api/tv";
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

  try {
    const tvDetails = await getTvDetail(tmdbId);

    if (tvDetails) {
      const seasonDetails = await getSeasonDetails(tmdbId, 1);
      const numberOfSeasons = tvDetails.number_of_seasons;
      const numberOfEpisodes = tvDetails.number_of_episodes;
      const episodeRuntime = seasonDetails.episodes[0].runtime;

      const totalRuntime = numberOfEpisodes * episodeRuntime;

      const allTvs = await getAllTvs();
      const tvExists = allTvs.find((tv) => tv.tmdb_id === Number(tmdbId));

      let data;

      if (tvExists) {
        return new NextResponse("TV already exists", { status: 200 });
      } else {
        data = await addTv({
          tmdbId: Number(tmdbId),
          title,
          numberOfSeasons,
          numberOfEpisodes,
          releaseDate,
          totalRuntime,
          genres,
          posterPath,
          overview,
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
