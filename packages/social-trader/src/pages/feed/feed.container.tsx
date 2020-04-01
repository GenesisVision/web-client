import { getEmptyPostLoaderData } from "components/conversation/conversation.loader";
import {
  getGlobalFeed,
  getNewsFeed
} from "components/conversation/conversation.service";
import { PostList } from "components/conversation/post-list/post-list";
import { PostInputContainer } from "components/conversation/post/post-input/post-input.container";
import useApiRequest from "hooks/api-request.hook";
import React, { useEffect } from "react";
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
  const { data, sendRequest } = useApiRequest({
    request: () =>
      feedType === FEED_TYPE.ALL ? getGlobalFeed() : getNewsFeed()
  });
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <div>
      {isAuthenticated && <PostInputContainer onSuccess={sendRequest} />}
      <PostList
        loaderData={[getEmptyPostLoaderData()]}
        data={data!?.items}
        updateData={sendRequest}
      />
    </div>
  );
};

export const FeedContainer = React.memo(_FeedContainer);
