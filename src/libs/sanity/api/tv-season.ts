import sanityClient from "../sanity";
import * as queries from "../queries/tvSeasonQueries";
import {
  AddSeason,
  AddSeasonStatus,
  CreateSeasonStatus,
  InternalSeason,
  InternalSeasonAndUser,
  UpdateSeason,
  UpdateSeasonEpisodeStatus,
} from "@/models/tvs";
import axios from "axios";

/*-------------------- GET --------------------*/

export async function getAllSeasonsByTv(tvId: string) {
  const result = await sanityClient.fetch<InternalSeason[]>(
    queries.getAllSeasonsByTvQuery,
    { tvId },
    { cache: "no-cache" },
  );
  return result;
}

export async function getUserSeasonsByTv(tvId: string, userId: string) {
  const result = await sanityClient.fetch<{
    _id: string;
    seasons: InternalSeasonAndUser[];
  }>(queries.getUserSeasonsByTvQuery, { tvId, userId }, { cache: "no-cache" });
  return result;
}

/*-------------------- POST / PATCH --------------------*/

export async function addSeason({
  tmdbId,
  tvId,
  numberOfEpisodes,
  releaseDate,
  seasonNumber,
  episodes,
}: AddSeason) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "season",
          title: {
            _type: "reference",
            _ref: tvId,
          },
          tmdb_id: tmdbId,
          number_of_episodes: numberOfEpisodes,
          release_date: releaseDate,
          season_number: seasonNumber,
          episodes: episodes.map((episode) => ({
            _key: `${tmdbId}-${episode.episodeTotalNumber}`,
            episode_name: episode.episodeName,
            episode_number: episode.episodeNumber,
            episode_release_date: episode.episodeReleaseDate,
            episode_runtime: episode.episodeRuntime,
            episode_total_number: episode.episodeTotalNumber,
          })),
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

export async function updateSeason({
  seasonId,
  tmdbId,
  episodes,
}: UpdateSeason) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: seasonId,
          inc: {
            number_of_episodes: episodes.length,
          },
          insert: {
            after: "episodes[-1]",
            items: episodes.map((episode) => ({
              _key: `${tmdbId}-${episode.episodeTotalNumber}`,
              episode_name: episode.episodeName,
              episode_number: episode.episodeNumber,
              episode_release_date: episode.episodeReleaseDate,
              episode_runtime: episode.episodeRuntime,
              episode_total_number: episode.episodeTotalNumber,
            })),
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

export async function createUserSeasonAndStatus({
  userId,
  tvId,
  seasonId,
  allWatched,
  episodes,
}: CreateSeasonStatus) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "user_season",
          title: {
            _type: "reference",
            _ref: userId,
          },
          tv: {
            _type: "reference",
            _ref: tvId,
          },
          seasons: [
            {
              _key: seasonId,
              season: {
                _type: "reference",
                _ref: seasonId,
              },
              account_states: {
                all_watched: allWatched,
                episodes: episodes.map((episode) => ({
                  _key: episode.episodeId,
                  episode_id: episode.episodeId,
                  episode_number: episode.episodeNumber,
                  watched: episode.watched,
                })),
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

export async function addUserSeasonAndStatus({
  userSeasonId,
  seasonId,
  allWatched,
  episodes,
}: AddSeasonStatus) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userSeasonId,
          insert: {
            after: "seasons[-1]",
            items: [
              {
                _key: seasonId,
                season: {
                  _type: "reference",
                  _ref: seasonId,
                },
                account_states: {
                  all_watched: allWatched,
                  episodes: episodes.map((episode) => ({
                    _key: episode.episodeId,
                    episode_id: episode.episodeId,
                    episode_number: episode.episodeNumber,
                    watched: episode.watched,
                  })),
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

export async function addUserEpisodeAndStatus({
  userSeasonId,
  seasonId,
  allWatched,
  episodes,
}: AddSeasonStatus) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userSeasonId,
          seasons: {
            _key: seasonId,
            all_watched: allWatched,
            insert: {
              after: "episodes[-1]",
              items: episodes.map((episode) => ({
                _key: episode.episodeId,
                episode_id: episode.episodeId,
                episode_number: episode.episodeNumber,
                watched: episode.watched,
              })),
            },
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

export async function updateUserEpisodeAndStatus({
  userSeasonId,
  seasonId,
  allWatched,
  episodes,
}: UpdateSeasonEpisodeStatus) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userSeasonId,
          seasons: {
            _key: seasonId,
            all_watched: allWatched,
            set: {
              episodes: episodes.map((episode) => ({
                _key: episode.episodeId,
                watched: episode.watched,
              })),
            },
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
