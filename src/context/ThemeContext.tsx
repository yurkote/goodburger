import React, { SetStateAction, createContext } from "react";

interface IContextState {
  theme: string;
  setTheme: React.Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext({} as IContextState);