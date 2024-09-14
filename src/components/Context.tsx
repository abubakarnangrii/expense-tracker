"use client";

import { createContext, useState, ReactNode, useContext } from "react";

interface UserContextType {
  user: string;
  setUser: (user: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string>("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    return { user: "null", setUser: () => {} };
  }
  return context;
};
