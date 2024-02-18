import {
  AddMovie,
  InternalMovie,
  InternalMovieUser,
  AddMovieStatus,
  CreateMovieStatus,
} from "@/models/movies";
import sanityClient from "../sanity";
import * as queries from "../queries/movieQueries";
import axios from "axios";

/*-------------------- GET --------------------*/

export async function getAllMovies() {
  const result = await sanityClient.fetch<InternalMovie[]>(
    queries.getAllMoviesQuery,
    {},
    { cache: "no-cache" },
  );
  return result;
}

export async function getUserMovies(userId: string) {
  const result = await sanityClient.fetch<{
    _id: string;
    movies: InternalMovieUser[];
  }>(queries.getUserMoviesQuery, { userId }, { cache: "no-cache" });
  return result;
}

/*-------------------- POST / PATCH --------------------*/

export async function addMovie({
  tmdbId,
  title,
  releaseDate,
  genres,
  posterPath,
  overview,
}: AddMovie) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "movie",
          tmdb_id: tmdbId,
          title,
          release_date: releaseDate,
          genres,
          poster_path: posterPath,
          overview,
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

export async function createUserMovieAndStatus({
  movieId,
  userId,
  status,
}: CreateMovieStatus) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "user_movie",
          title: {
            _type: "reference",
            _ref: userId,
          },
          movies: [
            {
              _key: movieId,
              movie: {
                _type: "reference",
                _ref: movieId,
              },
              account_states: {
                status,
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

export async function addUserMovieStatus({
  userMovieId,
  movieId,
  status,
}: AddMovieStatus) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userMovieId,
          insert: {
            after: "movies[-1]",
            items: [
              {
                _key: movieId,
                movie: {
                  _type: "reference",
                  _ref: movieId,
                },
                account_states: {
                  status,
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

export async function updateUserMovieStatus({
  userMovieId,
  movieId,
  status,
}: AddMovieStatus) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userMovieId,
          set: {
            [`movies[_key=="${movieId}"].account_states.status`]: status,
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

export async function deleteUserMovieAndStatus(
  userMovieId: string,
  movieId: string,
) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userMovieId,
          unset: [`movies[_key=="${movieId}"]`],
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
