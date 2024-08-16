import { createContext, useContext } from "react";

import { useMyInfo } from "../hooks/useUserInfo";

const UserContext = createContext();

function UserProvider({ children }) {
  const { myInfo, status } = useMyInfo();

  let loggedIn = false;
  if (status === "success" && myInfo) loggedIn = true;
  else loggedIn = false;

  return (
    <UserContext.Provider value={{ myInfo, loggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error("SearchContext use outside of SearchProvider");

  return context;
}

export { UserProvider, useUser };
