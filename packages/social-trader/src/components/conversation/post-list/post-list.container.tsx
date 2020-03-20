import { getPosts } from "components/conversation/conversation.service";
import { PostList } from "components/conversation/post-list/post-list";
import useApiRequest from "hooks/api-request.hook";
import React, { useEffect } from "react";

const _PostListContainer: React.FC<Props> = ({ id }) => {
  const { data, sendRequest } = useApiRequest({
    request: () => getPosts({ id }),
    fetchOnMount: true
  });
  useEffect(() => {
    sendRequest();
  }, [id]);
  if (!data) return null;
  return <PostList id={id} data={data.items} updateData={sendRequest} />;
};

interface Props {
  id: string;
}

export const PostListContainer = React.memo(_PostListContainer);
