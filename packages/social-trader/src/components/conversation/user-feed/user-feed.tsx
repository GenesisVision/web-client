import { getPosts } from "components/conversation/conversation.service";
import { PostListWithInput } from "components/conversation/post-list/post-list-with-input";
import { useIsOwnPage } from "components/manager/manager.page.helpers";
import React, { useCallback } from "react";

interface Props {
  id: string;
}

const _UserFeed: React.FC<Props> = ({ id }) => {
  const isOwnPage = useIsOwnPage(id);
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
      showInput={isOwnPage}
    />
  );
};

export const UserFeed = React.memo(_UserFeed);
