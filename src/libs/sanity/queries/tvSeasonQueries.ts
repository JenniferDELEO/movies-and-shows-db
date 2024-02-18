import { groq } from "next-sanity";

export const getUserSeasonsByTvQuery = groq`*[_type == "user_season" && tv._ref == $tvId && title._ref == $userId][0] {
    _id,              
    seasons[]{
        season->,
        account_states->
    }
}`;

export const getAllSeasonsByTvQuery = groq`*[_type == "season" && title._ref == $tvId] {
    _id,
    episodes[]{
        _id,
        episode_name,
        episode_number,
        episode_release_date,
        episode_runtime,
        episode_total_number
    },
    number_of_episodes,
    release_date,
    season_number,
    tmdb_id
}`;
