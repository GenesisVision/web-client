import {
  getGlobalFeed,
  getNewsFeed
} from "components/conversation/conversation.service";
import { PostListWithInput } from "components/conversation/post-list/post-list-with-input";
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

const _FeedContainer: React.FC<Props> = ({ feedType }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const fetchMethod = feedType === FEED_TYPE.ALL ? getGlobalFeed : getNewsFeed;
  return (
    <PostListWithInput fetchMethod={fetchMethod} showInput={isAuthenticated} />
  );
};

export const FeedContainer = React.memo(_FeedContainer);
