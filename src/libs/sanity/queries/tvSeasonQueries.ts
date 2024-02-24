import { groq } from "next-sanity";

export const getUserSeasonsByTvQuery = groq`*[_type == "user_season" && tv._ref == $tvId && user._ref == $userId][0] {
    _id,              
    user_name,
    tv->,
    season->,
    account_states
}`;

export const getAllSeasonsByTvIdQuery = groq`*[_type == "season" && tv._ref == $tvId] {
    _id,
    tv_name,
    season_number,
    number_of_episodes,
    release_date,
    tmdb_id
}`;
