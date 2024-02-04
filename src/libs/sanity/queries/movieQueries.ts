import { groq } from "next-sanity";

export const getUserMoviesQuery = groq`*[_type == "user_movies" && title._ref == $userId][0] {
    _id,
    movies[]{
        movie->,
        account_states
    }
    }
    `;
