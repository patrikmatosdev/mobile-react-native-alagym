import React, { createContext, ReactNode, useState } from "react";

interface GymContextProps {
  selected: number | null;
  setSelected:  React.Dispatch<React.SetStateAction<number | null>>;
}

interface ProviderProps {
  children: ReactNode;
}

export const GymContext = createContext<GymContextProps>({} as GymContextProps);

export function GymProvider({ children }: ProviderProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <GymContext.Provider value={{ selected, setSelected }}>
      {children}
    </GymContext.Provider>
  );
}