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

export type User = {
  username: string | null;
  accountIdV3: number | null;
  accountIdV4: string | null;
  sessionId: string | null;
};
