import { groq } from "next-sanity";

export const getUserEpisodesByTvQuery = groq`*[_type == "user_episode" && tv._ref == $tvId && user._ref == $userId] {
    _id,              
    user_name,
    tv->,
    season->,
    episode->,
    account_states
}`;

export const getUserEpisodesBySeasonQuery = groq`*[_type == "user_episode" && season._ref == $seasonId && user._ref == $userId] {
    _id,              
    user_name,
    tv->,
    season->,
    episode->,
    account_states
}`;

export const getAllEpisodesByTvIdQuery = groq`*[_type == "episode" && tv._ref == $tvId] {
    _id,
    episode_title,
    episode_number,
    episode_total_number,
    season_number,
    episode_release_date,
    episode_runtime,
    tmdb_id,
    tv->,
    season->,
}`;

export const getAllEpisodesBySeasonIdQuery = groq`*[_type == "episode" && season._ref == $seasonId] {
    _id,
    episode_title,
    episode_number,
    episode_total_number,
    season_number,
    episode_release_date,
    episode_runtime,
    tmdb_id,
    tv->,
    season->,
}`;

export const getUserEpisodesWatchedByTvQuery = groq`*[_type == "user_episode" && tv._ref == $tvId && user._ref == $userId && account_states.watched == true] {
    _id,              
    user_name,
    tv->,
    season->,
    episode->,
    account_states
}`;
