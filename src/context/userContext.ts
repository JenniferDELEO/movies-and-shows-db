import { Dispatch, SetStateAction, createContext } from "react";

type UserContextType = {
  user: {
    tmdb_username: string | null;
    tmdb_accountIdV3: number | null;
    tmdb_accountIdV4: string | null;
    tmdb_sessionId: string | null;
  };
  setUser: Dispatch<
    SetStateAction<{
      tmdb_username: string | null;
      tmdb_accountIdV3: number | null;
      tmdb_accountIdV4: string | null;
      tmdb_sessionId: string | null;
    }>
  >;
};

export const UserContext = createContext<UserContextType>({
  user: {
    tmdb_username: null,
    tmdb_accountIdV3: null,
    tmdb_accountIdV4: null,
    tmdb_sessionId: null,
  },
  setUser: () => null,
});
