import {
  getGlobalFeed,
  getNewsFeed
} from "components/conversation/conversation.service";
import { NewsListWithInput } from "pages/news/news-list/news-list-with-input";
import React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

export enum FEED_TYPE {
  ALL = "ALL",
  PERSONAL = "PERSONAL"
}

interface Props {
  feedType: FEED_TYPE;
}

export const NewsContainer: React.FC<Props> = ({ feedType }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const fetchMethod = feedType === FEED_TYPE.ALL ? getGlobalFeed : getNewsFeed;
  return (
    <NewsListWithInput fetchMethod={fetchMethod} showInput={isAuthenticated} />
  );
};
