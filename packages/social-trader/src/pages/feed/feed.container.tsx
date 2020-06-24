import {
  getGlobalFeed,
  getNewsFeed,
  getTopPosts,
  searchInFeed,
  SearchInFeedValues
} from "components/conversation/conversation.service";
import { PostListWithInput } from "components/conversation/post-list/post-list-with-input";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

export enum FEED_TYPE {
  ALL = "ALL",
  PERSONAL = "PERSONAL"
}

interface Props {
  showTop?: boolean;
  showInput?: boolean;
  searchValue?: SearchInFeedValues;
  feedType?: FEED_TYPE;
}

const getFeedMethod = (
  feedType?: FEED_TYPE,
  searchValue?: SearchInFeedValues,
  showTop?: boolean
) => {
  if (searchValue) return searchInFeed(searchValue);
  if (showTop) return getTopPosts;
  if (feedType === FEED_TYPE.PERSONAL) return getNewsFeed;
  return getGlobalFeed;
};

const _FeedContainer: React.FC<Props> = ({
  showTop,
  searchValue,
  showInput,
  feedType
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const fetchMethod = useCallback(
    () => getFeedMethod(feedType, searchValue, showTop),
    [feedType, searchValue, showTop]
  );
  return (
    <PostListWithInput
      key={JSON.stringify(searchValue)}
      fetchMethod={fetchMethod()}
      showInput={isAuthenticated && showInput}
    />
  );
};

export const FeedContainer = React.memo(_FeedContainer);
