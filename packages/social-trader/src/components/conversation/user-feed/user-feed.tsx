import { sendLoadFeedEvent } from "components/conversation/conversation.ga";
import { getPosts } from "components/conversation/conversation.service";
import { PostListWithInput } from "components/conversation/post-list/post-list-with-input";
import { useIsOwnPage } from "components/manager/manager.page.helpers";
import React, { useCallback, useEffect } from "react";

interface Props {
  canWritePost: boolean;
  id: string;
}

const _UserFeed: React.FC<Props> = ({ canWritePost, id }) => {
  const isOwnPage = useIsOwnPage(id);
  useEffect(() => {
    sendLoadFeedEvent();
  }, []);
  const fetchMethod = useCallback(
    (values: Object) => {
      return getPosts({ ...values, id });
    },
    [id]
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
