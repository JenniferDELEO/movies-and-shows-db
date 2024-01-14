import { Dispatch, SetStateAction, createContext } from "react";

type UserContextType = {
  user: {
    username: string | null;
    accountId: string | null;
    sessionId: string | null;
  };
  setUser: Dispatch<
    SetStateAction<{
      username: string | null;
      accountId: string | null;
      sessionId: string | null;
    }>
  >;
};

export const UserContext = createContext<UserContextType>({
  user: {
    username: null,
    accountId: null,
    sessionId: null,
  },
  setUser: () => null,
});
