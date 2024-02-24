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
  _id: string;
  email: string;
  image: string;
  name: string;
  isAdmin: boolean;
};

export type User = {
  tmdb_username: string | null;
  tmdb_accountIdV3: number | null;
  tmdb_accountIdV4: string | null;
  tmdb_sessionId: string | null;
};
