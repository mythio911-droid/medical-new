import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "patient" | "doctor" | "store";

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const AppContext = createContext<AppContextType>({ role: "patient", setRole: () => {} });

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>("patient");
  return <AppContext.Provider value={{ role, setRole }}>{children}</AppContext.Provider>;
};
