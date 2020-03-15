import { getConversationPostListLoaderData } from "components/conversation/conversation.loader";
import { getPosts } from "components/conversation/conversation.service";
import { PostList } from "components/conversation/post-list/post-list";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

export const PostListContainer: React.FC<Props> = ({ id }) => {
  const { data } = useApiRequest({
    request: getPosts,
    fetchOnMount: true,
    fetchOnMountData: { id }
  });
  return (
    <PostList data={data} loaderData={getConversationPostListLoaderData()} />
  );
};

interface Props {
  id: string;
}
