import { getPosts } from "components/conversation/conversation.service";
import { PostList } from "components/conversation/post-list/post-list";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

export const PostListContainer: React.FC<Props> = ({ id }) => {
  const { data, sendRequest } = useApiRequest({
    request: () => getPosts({ id }),
    fetchOnMount: true
  });
  if (!data) return null;
  return <PostList data={data.items} updateData={sendRequest} />;
};

interface Props {
  id: string;
}
