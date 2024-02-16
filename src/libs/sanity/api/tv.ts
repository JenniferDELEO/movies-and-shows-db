import sanityClient from "../sanity";
import * as queries from "../queries/tvQueries";
import {
  AddTvAndUser,
  AddTvStatus,
  CreateTvStatus,
  InternalTv,
  InternalTvAndUser,
  UpdateTvAndUser,
  UpdateTvStatus,
} from "@/models/tvs";
import axios from "axios";

/*-------------------- GET --------------------*/

export async function getAllTvs() {
  const result = await sanityClient.fetch<InternalTv[]>(
    queries.getAllTvsQuery,
    {},
    { cache: "no-cache" },
  );
  return result;
}

export async function getUserTvs(userId: string) {
  const result = await sanityClient.fetch<{
    _id: string;
    tvs: InternalTvAndUser[];
  }>(queries.getUserTvsQuery, { userId }, { cache: "no-cache" });
  return result;
}

/*-------------------- POST / PATCH --------------------*/

export async function addTvAndUser({
  tmdbId,
  title,
  numberOfSeasons,
  numberOfEpisodes,
  releaseDate,
  totalRuntime,
  genres,
  posterPath,
  overview,
  userId,
}: AddTvAndUser) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "tv",
          tmdb_id: tmdbId,
          title,
          number_of_seasons: numberOfSeasons,
          number_of_episodes: numberOfEpisodes,
          release_date: releaseDate,
          total_runtime: totalRuntime,
          genres,
          poster_path: posterPath,
          overview,
          users: [
            {
              _key: userId,
              _type: "reference",
              _ref: userId,
            },
          ],
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

export async function updateTvAndUser({ tvId, userId }: UpdateTvAndUser) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: tvId,
          insert: {
            after: "users[-1]",
            items: [
              {
                _key: userId,
                _type: "reference",
                _ref: userId,
              },
            ],
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

export async function createUserTvAndStatus({
  tvId,
  userId,
  status,
  watchState,
}: CreateTvStatus) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "user_tv",
          title: {
            _type: "reference",
            _ref: userId,
          },
          tvs: [
            {
              _key: tvId,
              tv: {
                _type: "reference",
                _ref: tvId,
              },
              account_states: {
                status,
                watch_state: watchState,
              },
            },
          ],
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

export async function addUserTvStatus({
  userTvId,
  tvId,
  status,
  watchState,
}: AddTvStatus) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userTvId,
          insert: {
            after: "tvs[-1]",
            items: [
              {
                _key: tvId,
                tv: {
                  _type: "reference",
                  _ref: tvId,
                },
                account_states: {
                  status,
                  watch_state: watchState,
                },
              },
            ],
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
  tvId,
  status,
  watchState,
}: UpdateTvStatus) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userTvId,
          set: {
            [`tvs[_key=="${tvId}"].account_states.status`]: status,
            [`tvs[_key=="${tvId}"].account_states.watch_state`]: watchState,
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

export async function deleteTvAndUser(tvId: string, userId: string) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: tvId,
          unset: [`users[_key=="${userId}"]`],
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

export async function deleteUserTvAndStatus(userTvId: string, tvId: string) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userTvId,
          unset: [`tvs[_key=="${tvId}"]`],
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
