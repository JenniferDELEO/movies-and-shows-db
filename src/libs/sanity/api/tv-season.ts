import sanityClient from "../sanity";
import axios from "axios";
import * as queries from "../queries/tvSeasonQueries";
import {
  AddEpisodesBySeason,
  AddEpisodesByUserSeason,
  AddSeason,
  AddUserSeason,
  InternalSeason,
  InternalSeasonAndUser,
  UpdateEpisodeUserSeasonStatus,
} from "@/models/seasons";

/*-------------------- GET --------------------*/

export async function getAllSeasonsByTvId(tvId: string) {
  const result = await sanityClient.fetch<InternalSeason[]>(
    queries.getAllSeasonsByTvIdQuery,
    { tvId },
    { cache: "no-cache" },
  );
  return result;
}

export async function getUserSeasonsByTv(tvId: string, userId: string) {
  const result = await sanityClient.fetch<InternalSeasonAndUser[]>(
    queries.getUserSeasonsByTvQuery,
    { tvId, userId },
    { cache: "no-cache" },
  );
  console.log("result", result);
  return result;
}

/*-------------------- POST / PATCH --------------------*/

export async function addSeason({
  tvName,
  seasonNumber,
  tvId,
  numberOfEpisodes,
  releaseDate,
  tmdbId,
  episodes,
}: AddSeason) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "season",
          tv_name: tvName,
          season_number: seasonNumber,
          tv: {
            _type: "reference",
            _ref: tvId,
          },
          number_of_episodes: numberOfEpisodes,
          release_date: releaseDate,
          tmdb_id: tmdbId,
          episodes: episodes.map((ep) => ({
            _key: ep.tmdb_id.toString(),
            _type: "episode",
            ...ep,
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

export async function addEpisodesBySeason({
  seasonId,
  numberOfEpisodes,
  episodes,
}: AddEpisodesBySeason) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: seasonId,
          set: {
            "[number_of_episodes]": numberOfEpisodes,
            episodes: episodes.map((ep) => ({
              _key: ep.tmdb_id.toString(),
              _type: "episode",
              ...ep,
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

export async function updateEpisodesBySeason({
  seasonId,
  numberOfEpisodes,
  episodes,
}: AddEpisodesBySeason) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: seasonId,
          set: {
            "[number_of_episodes]": numberOfEpisodes,
          },
          insert: {
            after: "episodes[-1]",
            items: episodes.map((ep) => ({
              _key: ep.tmdb_id.toString(),
              _type: "episode",
              ...ep,
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

export async function addUserSeason({
  userName,
  userId,
  tvId,
  seasonId,
  allWatched,
  episodes,
}: AddUserSeason) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "user_season",
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
          all_watched: allWatched,
          watched_episodes: episodes.map((ep) => ({
            _key: ep.tmdbId.toString(),
            season_number: ep.seasonNumber,
            episode_number: ep.episodeNumber,
            watched: ep.watched,
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

export async function addEpisodesByUserSeason({
  userSeasonId,
  allWatched,
  episodes,
}: AddEpisodesByUserSeason) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userSeasonId,
          set: {
            all_watched: allWatched,
            watched_episodes: episodes.map((ep) => ({
              _key: ep.tmdbId.toString(),
              season_number: ep.seasonNumber,
              episode_number: ep.episodeNumber,
              watched: ep.watched,
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

export async function updateEpisodesByUserSeason({
  userSeasonId,
  allWatched,
  episodes,
}: AddEpisodesByUserSeason) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userSeasonId,
          set: {
            all_watched: allWatched,
          },
          insert: {
            after: "watched_episodes[-1]",
            items: episodes.map((ep) => ({
              _key: ep.tmdbId.toString(),
              season_number: ep.seasonNumber,
              episode_number: ep.episodeNumber,
              watched: ep.watched,
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

export async function updateEpisodeUserSeasonStatus({
  userSeasonId,
  allWatched,
  episodes,
}: UpdateEpisodeUserSeasonStatus) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userSeasonId,
          set: {
            all_watched: allWatched,
            watched_episodes: episodes.map((ep) => ({
              _key: ep.tmdbId.toString(),
              season_number: ep.seasonNumber,
              episode_number: ep.episodeNumber,
              watched: ep.watched,
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

/*-------------------- DELETE --------------------*/

export async function deleteUserSeasonAndStatus(userSeasonId: string) {
  const mutation = {
    mutations: [
      {
        delete: {
          id: userSeasonId,
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
