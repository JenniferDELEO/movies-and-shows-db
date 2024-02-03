import { InternalUser } from "@/models/user";
import sanityClient from "./sanity";
import * as queries from "./sanityQueries";

export async function getUserData(userId: string) {
  const result = await sanityClient.fetch<InternalUser>(
    queries.getUserDataQuery,
    { userId },
    { cache: "no-cache" },
  );
  return result;
}
