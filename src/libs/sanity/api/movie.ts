import { AddMovieToAccount, InternalMovieResponse } from "@/models/movies";
import sanityClient from "../sanity";
import * as queries from "../queries/movieQueries";
import axios from "axios";

export async function getUserMovies(userId: string) {
  const result = await sanityClient.fetch<{
    id: string;
    movies: InternalMovieResponse[];
  }>(queries.getUserMoviesQuery, { userId }, { cache: "no-cache" });
  return result;
}

export async function addMovieToAccount({
  tmdbId,
  title,
  releaseDate,
  runtime,
  genres,
  posterPath,
  overview,
  userId,
  status,
}: AddMovieToAccount) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "movies",
          tmdb_id: tmdbId,
          title,
          release_date: releaseDate,
          runtime,
          genres,
          poster_path: posterPath,
          overview,
          insert: {
            after: "users[-1]",
            items: [
              {
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
  console.log(data);
}
