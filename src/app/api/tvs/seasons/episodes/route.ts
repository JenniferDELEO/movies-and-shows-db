import { addEpisode, getAllEpisodesByTvId } from "@/libs/sanity/api/episode";
import { getAllSeasonsByTvId } from "@/libs/sanity/api/tv-season";
import { authOptions } from "@/libs/sanity/auth";
import { Episode } from "@/models/tvs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const {
    tvId,
    episodes,
  }: { tvTmdbId: number; tvId: string; episodes: Episode[] } = await req.json();

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }

  try {
    const allEpisodesByTv = await getAllEpisodesByTvId(tvId);
    const allSeasonsByTv = await getAllSeasonsByTvId(tvId);

    if (allEpisodesByTv && allEpisodesByTv.length > 0) {
      const sortedAllEpisodesByTv = allEpisodesByTv.sort(
        (a, b) => a.episode_number - b.episode_number,
      );

      if (sortedAllEpisodesByTv.length === episodes.length) {
        return new NextResponse("All episodes already exists", {
          status: 200,
        });
      } else {
        episodes.map(async (ep) => {
          const episodeExists = sortedAllEpisodesByTv?.find(
            (episode) => episode.episode_number === ep.episode_number,
          );
          if (episodeExists) {
            return new NextResponse("Episode already exists", {
              status: 200,
            });
          } else {
            let previousSeasonsEpisodesToAdd = 0;
            if (ep.season_number > 1) {
              previousSeasonsEpisodesToAdd = episodes.reduce(
                (acc, episode) =>
                  episode.season_number < ep.season_number
                    ? acc + episode.episode_number
                    : acc,
                0,
              );
            }
            await addEpisode({
              episodeTitle: ep.name,
              episodeNumber: ep.episode_number,
              episodeTotalNumber:
                ep.episode_number + previousSeasonsEpisodesToAdd,
              seasonNumber: ep.season_number,
              episodeReleaseDate: ep.air_date,
              episodeRuntime: ep.runtime,
              tmdbId: ep.id,
              tvId,
              seasonId:
                allSeasonsByTv.find(
                  (season) => season.season_number === ep.season_number,
                )?._id || "",
            });
          }
        });
      }
    } else {
      episodes.map(async (ep) => {
        let previousSeasonsEpisodesToAdd = 0;
        if (ep.season_number > 1) {
          previousSeasonsEpisodesToAdd = episodes.reduce(
            (acc, episode) =>
              episode.season_number < ep.season_number ? acc + 1 : acc,
            0,
          );
        }
        await addEpisode({
          episodeTitle: ep.name,
          episodeNumber: ep.episode_number,
          episodeTotalNumber: ep.episode_number + previousSeasonsEpisodesToAdd,
          seasonNumber: ep.season_number,
          episodeReleaseDate: ep.air_date,
          episodeRuntime: ep.runtime,
          tmdbId: ep.id,
          tvId,
          seasonId:
            allSeasonsByTv.find(
              (season) => season.season_number === ep.season_number,
            )?._id || "",
        });
      });
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
