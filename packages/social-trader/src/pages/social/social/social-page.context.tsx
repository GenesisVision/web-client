import { SearchInFeedValues } from "components/conversation/conversation.service";
import React, { createContext, useMemo, useState } from "react";

type SocialSearchState = SearchInFeedValues;

export const SocialSearchInitialState: SocialSearchState = { hashTags: [] };

export const SocialSearchContext = createContext<{
  searchValue: SocialSearchState;
  setSearchValue: (value: SocialSearchState) => void;
}>({ searchValue: SocialSearchInitialState, setSearchValue: () => {} });

export const SocialSearchContextProvider: React.FC = ({ children }) => {
  const [searchValue, setSearchValue] = useState<SocialSearchState>(
    SocialSearchInitialState
  );
  const contextValue = useMemo(() => {
    return { searchValue, setSearchValue };
  }, [searchValue, setSearchValue]);
  return (
    <SocialSearchContext.Provider value={contextValue}>
      {children}
    </SocialSearchContext.Provider>
  );
};
