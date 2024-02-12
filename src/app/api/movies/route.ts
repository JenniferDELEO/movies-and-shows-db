import {
  addMovieAndUser,
  getAllMovies,
  updateMovieAndUser,
} from "@/libs/sanity/api/movie";
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
    const allMovies = await getAllMovies();
    const movieExists = allMovies.find(
      (movie) => movie.tmdb_id === Number(tmdbId),
    );

    let data;

    if (movieExists) {
      const checkUserExists = movieExists.users.find(
        (user) => user._ref === userId,
      );
      if (checkUserExists) {
        return new NextResponse("Movie already exists", { status: 200 });
      } else {
        data = await updateMovieAndUser({
          movieId: movieExists._id,
          userId,
        });
      }
    } else {
      data = await addMovieAndUser({
        tmdbId: Number(tmdbId),
        title,
        releaseDate,
        genres,
        posterPath,
        overview,
        userId,
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
