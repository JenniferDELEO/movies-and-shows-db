import {
  createUserMovieAndStatus,
  addUserMovieStatus,
  getAllMovies,
  getUserMovies,
  updateUserMovieStatus,
} from "@/libs/sanity/api/movie";
import { authOptions } from "@/libs/sanity/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const { tmdbId, status } = await req.json();

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }

  const userId = session.user.id;

  try {
    const allMovies = await getAllMovies();
    const movieId = allMovies.find(
      (movie) => movie.tmdb_id === Number(tmdbId),
    )?._id;
    if (!movieId) {
      return new NextResponse("Failed to retrieve movie Id", { status: 400 });
    }

    const userMovies = await getUserMovies(userId);

    let data;

    if (userMovies) {
      const movieExists = userMovies.movies.find(
        (movie) => movie.movie.tmdb_id === Number(tmdbId),
      );
      if (movieExists) {
        data = await updateUserMovieStatus({
          userMovieId: userMovies._id,
          movieId,
          status,
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
