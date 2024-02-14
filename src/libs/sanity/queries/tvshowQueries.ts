import { groq } from "next-sanity";

export const getUserTvShowsQuery = groq`*[_type == "user_tv_show" && title._ref == $userId][0] {
    _id,
    tv_shows[]{
        tv_show->,
        account_states
    }
    }
    `;

export const getAllTvShowsQuery = groq`*[_type == "tv_show"] {
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
