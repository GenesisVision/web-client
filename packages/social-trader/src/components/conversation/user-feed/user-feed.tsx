import { getPosts } from "components/conversation/conversation.service";
import { PostListWithInput } from "components/conversation/post-list/post-list-with-input";
import React, { useCallback } from "react";

interface Props {
  canWritePost: boolean;
  id: string;
}

const _UserFeed: React.FC<Props> = ({ canWritePost, id }) => {
  const fetchMethod = useCallback(
    (values: Object) => {
      return getPosts({ ...values, id, userMode: "ProfileOnlyOwnerPosts" });
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
