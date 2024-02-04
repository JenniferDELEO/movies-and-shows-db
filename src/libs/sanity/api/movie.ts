import { InternalMovie } from "@/models/movies";
import sanityClient from "../sanity";
import * as queries from "../queries/movieQueries";

export async function getUserMovies(userId: string) {
  const result = await sanityClient.fetch<InternalMovie[]>(
    queries.getUserMoviesQuery,
    { userId },
    { cache: "no-cache" },
  );
  return result;
}
