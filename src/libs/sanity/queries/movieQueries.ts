import { groq } from "next-sanity";

export const getUserMoviesQuery = groq`*[_type == "user_movie" && user._ref == $userId][0] {
    _id,
    movies[]{
        movie->,
        account_states
    }
    }
    `;

export const getAllMoviesQuery = groq`*[_type == "movie"] {
    _id,
    title,
    runtime,
    release_date,
    genres,
    poster_path,
    overview,
    tmdb_id,
}`;

export const getMovieByIdQuery = groq`*[_type == "movie" && _id == $movieId][0] {
    _id,
    title,
    runtime,
    release_date,
    genres,
    poster_path,
    overview,
    tmdb_id,
}`;

export const getMovieByTmdbIdQuery = groq`*[_type == "movie" && tmdb_id == $tmdbId][0] {
    _id,
    title,
    runtime,
    release_date,
    genres,
    poster_path,
    overview,
    tmdb_id,
}`;
