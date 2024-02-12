import { groq } from "next-sanity";

export const getUserTvShowsQuery = groq`*[_type == "user_tvshows" && title._ref == $userId][0] {
    _id,
    tvshows[]{
        tvshow->,
        account_states
    }
    }
    `;
