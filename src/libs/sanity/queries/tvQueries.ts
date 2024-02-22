import { groq } from "next-sanity";

export const getUserTvsQuery = groq`*[_type == "user_tv" && user._ref == $userId] {
    _id,
    user_name,
    tv_title,
    tv->,
    account_states
    }
    `;

export const getUserTvByIdQuery = groq`*[_type == "user_tv" && user._ref == $userId && tv._ref == $tvId][0] {
        _id,
        user_name,
        tv_title,
        tv->,
        account_states
        }
        `;

export const getAllTvsQuery = groq`*[_type == "tv"] {
        _id,
        title,
        number_of_seasons,
        number_of_episodes,
        release_date,
        total_runtime,
        genres,
        poster_path,
        overview,
        tmdb_id,
    }`;

export const getTvByIdQuery = groq`*[_type == "tv" && _id == $tvId][0] {
        _id,
        title,
        number_of_seasons,
        number_of_episodes,
        release_date,
        total_runtime,
        genres,
        poster_path,
        overview,
        tmdb_id,
    }`;
