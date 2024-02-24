import { getSeasonDetails, getTvDetailForDb } from "@/libs/api/tvs";
import {
  addSeason,
  getAllSeasonsByTvId,
  updateSeason,
} from "@/libs/sanity/api/tv-season";
import { authOptions } from "@/libs/sanity/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const { tvTmdbId, tvId } = await req.json();

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }

  try {
    const tvDetails = await getTvDetailForDb(tvTmdbId);
    const allSeasonsByTv = await getAllSeasonsByTvId(tvId);

    if (tvDetails) {
      for (let i = 1; i <= tvDetails.number_of_seasons; i++) {
        const seasonDetails = await getSeasonDetails(tvTmdbId, i);
        const seasonExists = allSeasonsByTv?.find(
          (season) => season.season_number === i,
        );

        if (seasonExists) {
          const numberOfEpisodesDb = seasonExists.number_of_episodes;
          const numberOfEpisodesApi = seasonDetails.episodes.length;

          if (numberOfEpisodesDb !== numberOfEpisodesApi) {
            await updateSeason({
              seasonId: seasonExists._id,
              numberOfEpisodes: numberOfEpisodesApi,
            });
          } else {
            return new NextResponse(
              "Season already exists & informations are correct",
              { status: 200 },
            );
          }
        } else {
          await addSeason({
            tvName: tvDetails.name,
            seasonNumber: i,
            tvId,
            numberOfEpisodes: seasonDetails.episodes.length,
            releaseDate: seasonDetails.air_date,
            tmdbId: seasonDetails.id,
          });
        }
      }
      return NextResponse.json({
        status: 200,
        statusText: "Successful",
      });
    }
  } catch (error) {
    return new NextResponse("Unable to fetch", {
      status: 400,
      statusText: `Unable to fetch : ${error}`,
    });
  }
}
