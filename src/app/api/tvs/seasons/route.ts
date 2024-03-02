import { getSeasonDetails, getTvDetailForDb } from "@/libs/api/tvs";
import {
  addEpisodesBySeason,
  addSeason,
  getAllSeasonsByTvId,
  updateEpisodesBySeason,
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
        let episodesToAdd = seasonDetails.episodes.map((ep) => {
          let previousSeasonsEpisodesToAdd = 0;
          if (ep.season_number > 1) {
            previousSeasonsEpisodesToAdd = tvDetails.seasons
              .filter((season) => season.season_number !== 0)
              .reduce(
                (acc, season) =>
                  season.season_number < ep.season_number
                    ? acc + season.episode_count
                    : acc,
                0,
              );
          }
          return {
            episode_title: ep.name,
            episode_number: ep.episode_number,
            episode_total_number:
              ep.episode_number + previousSeasonsEpisodesToAdd,
            season_number: ep.season_number,
            episode_release_date: ep.air_date,
            episode_runtime: ep.runtime,
            tmdb_id: ep.id,
          };
        });

        if (seasonExists) {
          const numberOfEpisodesDb = seasonExists?.episodes?.length || 0;
          const numberOfEpisodesApi = seasonDetails.episodes.length;

          if (numberOfEpisodesDb === numberOfEpisodesApi) {
            if (seasonExists.season_number === tvDetails.number_of_seasons) {
              return new NextResponse("Season and episodes already exist", {
                status: 200,
              });
            } else {
              continue;
            }
          } else if (numberOfEpisodesDb > 0) {
            try {
              episodesToAdd = episodesToAdd.filter(
                (ep) =>
                  !seasonExists?.episodes?.find(
                    (e) => e.tmdb_id === ep.tmdb_id,
                  ),
              );
              await updateEpisodesBySeason({
                seasonId: seasonExists._id,
                numberOfEpisodes: numberOfEpisodesApi,
                episodes: episodesToAdd,
              });
            } catch (error: any) {
              console.log(error.response.data);
              return new NextResponse(
                "Unable to update season with new episodes",
                {
                  status: 400,
                  statusText: `Unable to update season with new episodes : ${error}`,
                },
              );
            }
          } else {
            try {
              await addEpisodesBySeason({
                seasonId: seasonExists._id,
                numberOfEpisodes: numberOfEpisodesApi,
                episodes: episodesToAdd,
              });
            } catch (error: any) {
              console.log(error.response.data);
              return new NextResponse("Unable to add episodes", {
                status: 400,
                statusText: `Unable to add episodes : ${error}`,
              });
            }
          }
        } else {
          try {
            await addSeason({
              tvName: tvDetails.name,
              seasonNumber: i,
              tvId,
              numberOfEpisodes: seasonDetails.episodes.length,
              releaseDate: seasonDetails.air_date,
              tmdbId: seasonDetails.id,
              episodes: episodesToAdd,
            });
          } catch (error: any) {
            console.log(error.response.data);
            return new NextResponse("Unable to add season", {
              status: 400,
              statusText: `Unable to add season : ${error}`,
            });
          }
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
