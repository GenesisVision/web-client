import { SearchInFeedValues } from "components/conversation/conversation.service";
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

interface Props {
  cookieShowEvents?: boolean;
}

const SocialPageContextInitialState: ISocialPageContextState = {
  searchValue: SocialSearchInitialState,
  setSearchValue: () => {},
  setShowEvents: () => {}
};

export const FeedContext = createContext<ISocialPageContextState>(
  SocialPageContextInitialState
);

export const SocialPageContextProvider: React.FC<Props> = ({
  cookieShowEvents = true,
  children
}) => {
  const [showEvents, setShowEvents] = useState<boolean>(cookieShowEvents);
  const [searchValue, setSearchValue] = useState<SocialSearchState>(
    SocialSearchInitialState
  );
  const contextValue = useMemo(() => {
    return { showEvents, setShowEvents, searchValue, setSearchValue };
  }, [showEvents, setShowEvents, searchValue, setSearchValue]);
  return (
    <FeedContext.Provider value={contextValue}>{children}</FeedContext.Provider>
  );
};
