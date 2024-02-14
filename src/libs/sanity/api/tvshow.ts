import sanityClient from "../sanity";
import * as queries from "../queries/tvshowQueries";
import { InternalTvShow, InternalTvShowAndUser } from "@/models/tvShows";

/*-------------------- GET --------------------*/

export async function getAllTvShows() {
  const result = await sanityClient.fetch<InternalTvShow[]>(
    queries.getAllTvShowsQuery,
    {},
    { cache: "no-cache" },
  );
  return result;
}

export async function getUserTvShows(userId: string) {
  const result = await sanityClient.fetch<{
    _id: string;
    tv_shows: InternalTvShowAndUser[];
  }>(queries.getUserTvShowsQuery, { userId }, { cache: "no-cache" });
  return result;
}

/*-------------------- POST / PATCH --------------------*/
