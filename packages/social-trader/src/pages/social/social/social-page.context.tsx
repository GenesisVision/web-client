import { SearchInFeedValues } from "components/conversation/conversation.service";
import { getShowEventsState } from "pages/feed/show-events-container/show-events-cookie-service";
import React, { createContext, useMemo, useState } from "react";

type SocialSearchState = SearchInFeedValues;

interface ISocialPageContextState {
  showEvents?: boolean;
  setShowEvents: (value: boolean) => void;
  searchValue: SocialSearchState;
  setSearchValue: (value: SocialSearchState) => void;
}

export const SocialSearchInitialState: SocialSearchState = {
  tagContent: [],
  hashTags: []
};

const SocialPageContextInitialState: ISocialPageContextState = {
  searchValue: SocialSearchInitialState,
  setSearchValue: () => {},
  setShowEvents: () => {}
};

export const SocialPageContext = createContext<ISocialPageContextState>(
  SocialPageContextInitialState
);

export const SocialPageContextProvider: React.FC = ({ children }) => {
  const cookieShowEvents = getShowEventsState();
  const [showEvents, setShowEvents] = useState<boolean>(cookieShowEvents);
  const [searchValue, setSearchValue] = useState<SocialSearchState>(
    SocialSearchInitialState
  );
  const contextValue = useMemo(() => {
    return { showEvents, setShowEvents, searchValue, setSearchValue };
  }, [showEvents, setShowEvents, searchValue, setSearchValue]);
  return (
    <SocialPageContext.Provider value={contextValue}>
      {children}
    </SocialPageContext.Provider>
  );
};
