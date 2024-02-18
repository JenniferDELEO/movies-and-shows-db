import { getSeasonDetails, getTvDetailForDb } from "@/libs/api/tvs";
import {
  addSeason,
  createUserSeasonAndStatus,
  getAllSeasonsByTv,
  getUserSeasonsByTv,
  updateSeason,
} from "@/libs/sanity/api/tv-season";
import { authOptions } from "@/libs/sanity/auth";
import { InternalSeason } from "@/models/tvs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const {
    tvTmdbId,
    tvId,
    seasons,
  }: {
    tvTmdbId: number;
    tvId: string;
    seasons: {
      seasonNumber: number;
      episodes: {
        id: string;
        episodeNumber: number;
        watched: boolean;
      }[];
    }[];
  } = await req.json();

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }

  const userId = session.user.id;

  try {
    const allSeasonsByTv = await getAllSeasonsByTv(tvId);
    const userSeasonsByTv = await getUserSeasonsByTv(tvId, userId);

    for (let i = 0; i < seasons.length; i++) {
      const seasonId = allSeasonsByTv.find(
        (season) => season.season_number === seasons[i].seasonNumber,
      )?._id;

      if (!seasonId) {
        return new NextResponse("Failed to retrieve season id", {
          status: 404,
        });
      }

      const episodesInDb = allSeasonsByTv.find(
        (season) => season.season_number === seasons[i].seasonNumber,
      )?.episodes;

      if (!episodesInDb) {
        return new NextResponse("Failed to retrieve episodes", { status: 404 });
      }

      const episodesToAdd = seasons[i].episodes;
      /* const watchedEpisodes = episodesToAdd.filter(
        (episode) => episode.watched,
      ); */
      /* const allWatched = watchedEpisodes.length === episodesInDb.length; */

      if (episodesInDb.length === episodesToAdd?.length) {
        /* if (userSeasonsByTv) {
        const seasonExists = userSeasonsByTv.seasons.find((season) => season.season.season_number === seasons[i].season_number);
        if (seasonExists) {

        } else {

        } */
      } /* else {
        await createUserSeasonAndStatus({
            userId,
            tvId,
            seasonId,
            allWatched,
            episodes: episodesToAdd
        })
    } */
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
