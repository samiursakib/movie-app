"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type GlobalStateType = {
  watchList: {
    [key: string]: string;
  }[];
  isSearching: boolean;
  searchInputValue: string;
};

type GlobalStateContextType = {
  globalState: GlobalStateType;
  setGlobalState: Dispatch<SetStateAction<GlobalStateType>>;
};

const GlobalStateContext = createContext({} as GlobalStateContextType);

export const GlobalStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [globalState, setGlobalState] = useState<GlobalStateType>({
    watchList: [],
    isSearching: false,
    searchInputValue: "",
  });
  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
