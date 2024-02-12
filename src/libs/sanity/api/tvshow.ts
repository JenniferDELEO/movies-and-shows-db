import sanityClient from "../sanity";
import * as queries from "../queries/tvshowQueries";

export async function getUserTvShows(userId: string) {
  const result = await sanityClient.fetch(
    queries.getUserTvShowsQuery,
    { userId },
    { cache: "no-cache" },
  );
  return result;
}
