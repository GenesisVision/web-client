import { SearchInFeedValues } from "components/conversation/conversation.service";
import React, { createContext, useMemo, useState } from "react";

type SocialSearchState = SearchInFeedValues;

interface ISocialPageContextState {
  searchValue: SocialSearchState;
  setSearchValue: (value: SocialSearchState) => void;
}

export const SocialSearchInitialState: SocialSearchState = {
  tagContent: [],
  hashTags: []
};

const SocialPageContextInitialState: ISocialPageContextState = {
  searchValue: SocialSearchInitialState,
  setSearchValue: () => {}
};

export const SocialPageContext = createContext<ISocialPageContextState>(
  SocialPageContextInitialState
);

export const SocialPageContextProvider: React.FC = ({ children }) => {
  const [searchValue, setSearchValue] = useState<SocialSearchState>(
    SocialSearchInitialState
  );
  const contextValue = useMemo(() => {
    return { searchValue, setSearchValue };
  }, [searchValue, setSearchValue]);
  return (
    <SocialPageContext.Provider value={contextValue}>
      {children}
    </SocialPageContext.Provider>
  );
};
