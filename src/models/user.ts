export type AccountDetail = {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

export type InternalUser = {
  user_id: string | null;
  user_name: string | null;
  user_email: string | null;
  user_image: string | null;
};

export type User = {
  tmdb_username: string | null;
  tmdb_accountIdV3: number | null;
  tmdb_accountIdV4: string | null;
  tmdb_sessionId: string | null;
};
