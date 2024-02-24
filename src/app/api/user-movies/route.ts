import {
  createUserMovieAndStatus,
  addUserMovieStatus,
  getUserMovies,
  updateUserMovieStatus,
  getMovieByTmdbId,
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
  const userName = session.user.name!;

  if (!userId && !userName) {
    return new NextResponse("User not found", { status: 400 });
  }

  try {
    const movie = await getMovieByTmdbId(Number(tmdbId));
    const movieId = movie._id;
    if (!movie) {
      return new NextResponse("Failed to retrieve movie", { status: 400 });
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
      data = await createUserMovieAndStatus({
        movieId,
        userId,
        userName,
        status,
      });
    }

    return NextResponse.json(data, { status: 200, statusText: "Successful" });
  } catch (error) {
    return new NextResponse("Unable to fetch", {
      status: 400,
      statusText: `Unable to fetch : ${error}`,
    });
  }
}
