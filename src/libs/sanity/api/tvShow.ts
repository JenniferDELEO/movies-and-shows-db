import sanityClient from "../sanity";
import * as queries from "../queries/tvShowQueries";
import {
  AddTvShowAndUser,
  AddTvShowStatus,
  CreateTvShowStatus,
  InternalTvShow,
  InternalTvShowAndUser,
  UpdateTvShowAndUser,
  UpdateTvShowStatus,
} from "@/models/tvShows";
import axios from "axios";

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

export async function addTvShowAndUser({
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
}: AddTvShowAndUser) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "tv_show",
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

export async function updateTvShowAndUser({
  tvShowId,
  userId,
}: UpdateTvShowAndUser) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: tvShowId,
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

export async function createUserTvShowAndStatus({
  tvShowId,
  userId,
  status,
  watchState,
}: CreateTvShowStatus) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "user_tv_show",
          title: {
            _type: "reference",
            _ref: userId,
          },
          tv_shows: [
            {
              _key: tvShowId,
              tv_show: {
                _type: "reference",
                _ref: tvShowId,
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

export async function addUserTvShowStatus({
  userTvshowId,
  tvShowId,
  status,
  watchState,
}: AddTvShowStatus) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userTvshowId,
          insert: {
            after: "tv_shows[-1]",
            items: [
              {
                _key: tvShowId,
                tv_show: {
                  _type: "reference",
                  _ref: tvShowId,
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

export async function updateUserTvShowStatus({
  userTvshowId,
  tvShowId,
  status,
  watchState,
}: UpdateTvShowStatus) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userTvshowId,
          set: {
            [`tv_shows[_key=="${tvShowId}"].account_states.status`]: status,
            [`tv_shows[_key=="${tvShowId}"].account_states.watch_state`]:
              watchState,
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

export async function deleteTvShowAndUser(tvShowId: string, userId: string) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: tvShowId,
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

export async function deleteUserTvShowAndStatus(
  userTvShowId: string,
  tvShowId: string,
) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userTvShowId,
          unset: [`tv_shows[_key=="${tvShowId}"]`],
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
