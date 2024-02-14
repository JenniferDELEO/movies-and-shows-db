import {
  createUserMovieAndStatus,
  addUserMovieStatus,
  getAllMovies,
  getUserMovies,
  updateUserMovieStatus,
} from "@/libs/sanity/api/movie";
import {
  getAllTvShows,
  getUserTvShows,
  updateUserTvShowStatus,
} from "@/libs/sanity/api/tvShow";
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
    const allTvShows = await getAllTvShows();
    const tvShowId = allTvShows.find(
      (movie) => movie.tmdb_id === Number(tmdbId),
    )?._id;
    if (!tvShowId) {
      return new NextResponse("Failed to retrieve tv show Id", { status: 400 });
    }

    const userTvShows = await getUserTvShows(userId);

    let data;

    if (userTvShows) {
      const tvShowExists = userTvShows.tv_shows.find(
        (tv_show) => tv_show.tv_show.tmdb_id === Number(tmdbId),
      );
      if (tvShowExists) {
        data = await updateUserTvShowStatus({
          userTvshowId: userTvShows._id,
          tvShowId,
          status,
          watchState,
        });
      } else {
        data = await addUserMovieStatus({
          userMovieId: userMovies._id,
          movieId,
          status,
        });
      }
    } else {
      data = await createUserMovieAndStatus({ movieId, userId, status });
    }

    return NextResponse.json(data, { status: 200, statusText: "Successful" });
  } catch (error) {
    return new NextResponse("Unable to fetch", {
      status: 400,
      statusText: `Unable to fetch : ${error}`,
    });
  }
}
