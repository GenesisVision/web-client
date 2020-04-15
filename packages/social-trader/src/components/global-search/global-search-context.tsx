import React, { createContext, useMemo, useState } from "react";

type GlobalSearchState = string;

export const GlobalSearchInitialState: GlobalSearchState = "";

export const GlobalSearchContext = createContext<{
  searchValue: GlobalSearchState;
  setSearchValue: (value: GlobalSearchState) => void;
}>({ searchValue: GlobalSearchInitialState, setSearchValue: () => {} });

export const GlobalSearchContextProvider: React.FC = ({ children }) => {
  const [searchValue, setSearchValue] = useState<GlobalSearchState>(
    GlobalSearchInitialState
  );
  const contextValue = useMemo(() => {
    return { searchValue, setSearchValue };
  }, [searchValue, setSearchValue]);
  return (
    <GlobalSearchContext.Provider value={contextValue}>
      {children}
    </GlobalSearchContext.Provider>
  );
};
