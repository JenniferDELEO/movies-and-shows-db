import { Dispatch, SetStateAction, createContext } from "react";

type UserContextType = {
  internalUser: {
    user_id: string | null;
    user_name: string | null;
    user_email: string | null;
    user_image: string | null;
  };
  setInternalUser: Dispatch<
    SetStateAction<{
      user_id: string | null;
      user_name: string | null;
      user_email: string | null;
      user_image: string | null;
    }>
  >;
};

export const InternalUserContext = createContext<UserContextType>({
  internalUser: {
    user_id: null,
    user_name: null,
    user_email: null,
    user_image: null,
  },
  setInternalUser: () => null,
});
