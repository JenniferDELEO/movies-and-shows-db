import { groq } from "next-sanity";

export const getUserTvsQuery = groq`*[_type == "user_tv" && title._ref == $userId][0] {
    _id,
    tvs[]{
        tv->,
        account_states
    }
    }
    `;

export const getAllTvsQuery = groq`*[_type == "tv"] {
        _id,
        tmdb_id,
        title,
        number_of_seasons,
        number_of_episodes,
        release_date,
        total_runtime,
        genres,
        poster_path,
        overview,
        users[]
    }`;
