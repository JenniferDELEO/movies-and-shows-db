import { Dispatch, SetStateAction, createContext } from "react";

type UserContextType = {
  user: {
    username: string | null;
    accountIdV3: string | null;
    accountIdV4: string | null;
    sessionId: string | null;
  };
  setUser: Dispatch<
    SetStateAction<{
      username: string | null;
      accountIdV3: string | null;
      accountIdV4: string | null;
      sessionId: string | null;
    }>
  >;
};

export const UserContext = createContext<UserContextType>({
  user: {
    username: null,
    accountIdV3: null,
    accountIdV4: null,
    sessionId: null,
  },
  setUser: () => null,
});
