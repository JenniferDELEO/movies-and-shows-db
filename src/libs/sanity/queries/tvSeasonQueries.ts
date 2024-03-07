import { groq } from "next-sanity";

export const getUserSeasonsByTvQuery = groq`*[_type == "user_season" && tv._ref == $tvId && user._ref == $userId] {
    _id,              
    user_name,
    tv->,
    season->,
    watched_episodes[]
}`;

export const getAllSeasonsByTvIdQuery = groq`*[_type == "season" && tv._ref == $tvId] {
    _id,
    tv_name,
    season_number,
    number_of_episodes,
    release_date,
    tmdb_id,
    episodes[]
}`;
