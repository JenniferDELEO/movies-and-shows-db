import { groq } from "next-sanity";

export const getUserMoviesQuery = groq`*[_type == "user_movie" && title._ref == $userId][0] {
    _id,
    movies[]{
        movie->,
        account_states
    }
    }
    `;

export const getAllMoviesQuery = groq`*[_type == "movie"] {
    _id,
    tmdb_id,
    title,
    release_date,
    runtime,
    genres,
    poster_path,
    overview,
}`;
