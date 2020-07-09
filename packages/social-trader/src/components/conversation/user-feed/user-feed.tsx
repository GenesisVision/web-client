import { sendLoadFeedEvent } from "components/conversation/conversation.ga";
import { getPosts } from "components/conversation/conversation.service";
import { PostListWithInput } from "components/conversation/post-list/post-list-with-input";
import { useIsOwnPage } from "components/manager/manager.page.helpers";
import { FeedContext } from "pages/social/social/feed.context";
import React, { useCallback, useContext, useEffect } from "react";

interface Props {
  canWritePost: boolean;
  id: string;
}

const _UserFeed: React.FC<Props> = ({ canWritePost, id }) => {
  const { showEvents } = useContext(FeedContext);
  const isOwnPage = useIsOwnPage(id);
  useEffect(() => {
    // sendLoadFeedEvent();
  }, []);
  const fetchMethod = useCallback(
    (values: Object) => {
      return getPosts({ ...values, showEvents, id });
    },
    [showEvents, id]
  );
  return (
    <PostListWithInput
      inputPlaceholder={!isOwnPage ? "Write something..." : undefined}
      key={id}
      id={id}
      fetchMethod={fetchMethod}
      showInput={canWritePost}
    />
  );
};

export const UserFeed = React.memo(_UserFeed);
