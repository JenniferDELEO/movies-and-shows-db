import { getMovieDetail } from "@/libs/api/movies";
import { addMovie, getAllMovies } from "@/libs/sanity/api/movie";
import { authOptions } from "@/libs/sanity/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const { tmdbId } = await req.json();

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }

  try {
    const movieDetails = await getMovieDetail(tmdbId);

    if (movieDetails) {
      const allMovies = await getAllMovies();
      const movieExists = allMovies.find(
        (movie) => movie.tmdb_id === Number(tmdbId),
      );
      const genres = movieDetails.genres.map((genre) => genre.name);

      let data;

      if (movieExists) {
        return new NextResponse("Movie already exists", { status: 200 });
      } else {
        data = await addMovie({
          tmdbId: Number(tmdbId),
          title: movieDetails.title,
          runtime: movieDetails.runtime,
          releaseDate: movieDetails.release_date,
          genres,
          posterPath: movieDetails.poster_path,
          overview: movieDetails.overview,
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
