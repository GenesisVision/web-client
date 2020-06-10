import { sendLoadFeedEvent } from "components/conversation/conversation.ga";
import { getPosts } from "components/conversation/conversation.service";
import { PostListWithInput } from "components/conversation/post-list/post-list-with-input";
import React, { useCallback, useEffect } from "react";

interface Props {
  canWritePost: boolean;
  id: string;
}

const _UserFeed: React.FC<Props> = ({ canWritePost, id }) => {
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
      key={id}
      id={id}
      fetchMethod={fetchMethod}
      showInput={canWritePost}
    />
  );
};

export const UserFeed = React.memo(_UserFeed);
