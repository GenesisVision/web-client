import {
  getGlobalFeed,
  getNewsFeed,
  getTopPosts,
  searchInFeed,
  SearchInFeedValues
} from "components/conversation/conversation.service";
import { PostListWithInput } from "components/conversation/post-list/post-list-with-input";
import { IPostListContainerInitData } from "components/conversation/post-list/post-list.container";
import { FeedContext } from "pages/social/social/feed.context";
import React, { useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import Token from "services/api-client/token";
import { AnyObjectType } from "utils/types";

export enum FEED_TYPE {
  ALL = "ALL",
  PERSONAL = "PERSONAL"
}

interface Props extends IPostListContainerInitData {
  showTop?: boolean;
  showInput?: boolean;
  searchValue?: SearchInFeedValues;
  feedType?: FEED_TYPE;
}

const getFeedMethod = ({
  feedType,
  searchValue,
  showTop,
  showEvents
}: {
  feedType?: FEED_TYPE;
  searchValue?: SearchInFeedValues;
  showTop?: boolean;
  showEvents?: boolean;
}) => {
  if (searchValue) return searchInFeed(searchValue);
  if (showTop)
    return (values?: AnyObjectType) => getTopPosts({ ...values, showEvents });
  if (feedType === FEED_TYPE.PERSONAL)
    return (values?: AnyObjectType) => getNewsFeed({ ...values, showEvents });
  return (values?: AnyObjectType, token?: Token) =>
    getGlobalFeed({ ...values, showEvents }, token);
};

const _FeedContainer: React.FC<Props> = ({
  initData,
  showTop,
  searchValue,
  showInput,
  feedType
}) => {
  const { showEvents } = useContext(FeedContext);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const fetchMethod = useCallback(
    () => getFeedMethod({ feedType, searchValue, showTop, showEvents }),
    [showEvents, feedType, searchValue, showTop]
  );
  return (
    <PostListWithInput
      initData={initData}
      key={JSON.stringify({ ...searchValue, showEvents })}
      fetchMethod={fetchMethod()}
      showInput={isAuthenticated && showInput}
    />
  );
};

export const FeedContainer = React.memo(_FeedContainer);
