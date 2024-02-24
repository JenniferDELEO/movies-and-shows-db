import sanityClient from "../sanity";
import * as queries from "../queries/tvQueries";
import {
  AddTv,
  AddTvStatus,
  CreateTvStatus,
  InternalTv,
  InternalTvAndUser,
  UpdateTv,
} from "@/models/tvs";
import axios from "axios";

/*-------------------- GET --------------------*/

export async function getUserTvs(userId: string) {
  const result = await sanityClient.fetch<InternalTvAndUser[]>(
    queries.getUserTvsQuery,
    { userId },
    { cache: "no-cache" },
  );
  return result;
}

export async function getUserTvById(userId: string, tvId: string) {
  const result = await sanityClient.fetch<InternalTvAndUser>(
    queries.getUserTvByIdQuery,
    { userId, tvId },
    { cache: "no-cache" },
  );
  return result;
}

export async function getAllTvs() {
  const result = await sanityClient.fetch<InternalTv[]>(
    queries.getAllTvsQuery,
    {},
    { cache: "no-cache" },
  );
  return result;
}

export async function getTvById(tvId: string) {
  const result = await sanityClient.fetch<InternalTv>(
    queries.getTvByIdQuery,
    { tvId },
    { cache: "no-cache" },
  );
  return result;
}

export async function getTvByTmdbId(tmdbId: number) {
  const result = await sanityClient.fetch<InternalTv>(
    queries.getTvByTmdbIdQuery,
    { tmdbId },
    { cache: "no-cache" },
  );
  return result;
}

/*-------------------- POST / PATCH --------------------*/

export async function addTv({
  title,
  numberOfSeasons,
  numberOfEpisodes,
  releaseDate,
  totalRuntime,
  genres,
  posterPath,
  overview,
  tmdbId,
}: AddTv) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "tv",
          title,
          number_of_seasons: numberOfSeasons,
          number_of_episodes: numberOfEpisodes,
          release_date: releaseDate,
          total_runtime: totalRuntime,
          genres,
          poster_path: posterPath,
          overview,
          tmdb_id: tmdbId,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } },
  );
  return data;
}

export async function updateTv({
  tvId,
  numberOfSeasons,
  numberOfEpisodes,
  totalRuntime,
}: UpdateTv) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: tvId,
          number_of_seasons: numberOfSeasons,
          number_of_episodes: numberOfEpisodes,
          total_runtime: totalRuntime,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } },
  );
  return data;
}

export async function createUserTvAndStatus({
  userId,
  userName,
  tvId,
  tvTitle,
  status,
  watchState,
}: CreateTvStatus) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "user_tv",
          user_name: userName,
          tv_title: tvTitle,
          user: {
            _type: "reference",
            _ref: userId,
          },
          tv: {
            _type: "reference",
            _ref: tvId,
          },
          account_states: {
            status,
            watch_state: watchState,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } },
  );
  return data;
}

export async function updateUserTvStatus({
  userTvId,
  status,
  watchState,
}: AddTvStatus) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userTvId,
          account_states: {
            status,
            watch_state: watchState,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } },
  );

  return data;
}

/*-------------------- DELETE --------------------*/

export async function deleteUserTvAndStatus(userTvId: string) {
  const mutation = {
    mutations: [
      {
        delete: {
          id: userTvId,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } },
  );

  return data;
}
