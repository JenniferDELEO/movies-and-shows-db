import sanityClient from "../sanity";
import axios from "axios";
import * as queries from "../queries/episodeQueries";
import {
  AddEpisode,
  CreateEpisodeStatus,
  InternalEpisode,
  UpdateEpisodeStatus,
  UserEpisode,
} from "@/models/episode";

/*-------------------- GET --------------------*/

export async function getAllEpisodesByTvId(tvId: string) {
  const result = await sanityClient.fetch<InternalEpisode[]>(
    queries.getAllEpisodesByTvIdQuery,
    { tvId },
    { cache: "no-cache" },
  );
  return result;
}

export async function getAllEpisodesBySeasonId(seasonId: string) {
  const result = await sanityClient.fetch<InternalEpisode[]>(
    queries.getAllEpisodesBySeasonIdQuery,
    { seasonId },
    { cache: "no-cache" },
  );
  return result;
}

export async function getUserEpisodesByTvId(tvId: string, userId: string) {
  const result = await sanityClient.fetch<UserEpisode[]>(
    queries.getUserEpisodesByTvQuery,
    { tvId, userId },
    { cache: "no-cache" },
  );
  return result;
}

export async function getUserEpisodesBySeasonId(
  seasonId: string,
  userId: string,
) {
  const result = await sanityClient.fetch<UserEpisode[]>(
    queries.getUserEpisodesBySeasonQuery,
    { seasonId, userId },
    { cache: "no-cache" },
  );
  return result;
}

/*-------------------- POST / PATCH --------------------*/

export async function addEpisode({
  episodeTitle,
  episodeNumber,
  episodeTotalNumber,
  seasonNumber,
  episodeReleaseDate,
  episodeRuntime,
  tmdbId,
  tvId,
  seasonId,
}: AddEpisode) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "episode",
          episode_title: episodeTitle,
          episode_number: episodeNumber,
          episode_total_number: episodeTotalNumber,
          season_number: seasonNumber,
          episode_release_date: episodeReleaseDate,
          episode_runtime: episodeRuntime,
          tmdb_id: tmdbId,
          tv: {
            _type: "reference",
            _ref: tvId,
          },
          season: {
            _type: "reference",
            _ref: seasonId,
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

export async function createUserEpisodeAndStatus({
  userName,
  userId,
  tvId,
  seasonId,
  episodeId,
  watched,
}: CreateEpisodeStatus) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "user_episode",
          user_name: userName,
          user: {
            _type: "reference",
            _ref: userId,
          },
          tv: {
            _type: "reference",
            _ref: tvId,
          },
          season: {
            _type: "reference",
            _ref: seasonId,
          },
          episode: {
            _type: "reference",
            _ref: episodeId,
          },
          account_states: {
            watched,
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
  userEpisodeId,
  watched,
}: UpdateEpisodeStatus) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userEpisodeId,
          account_states: {
            watched,
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

export async function deleteUserEpisodeAndStatus(userEpisodeId: string) {
  const mutation = {
    mutations: [
      {
        delete: {
          id: userEpisodeId,
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
