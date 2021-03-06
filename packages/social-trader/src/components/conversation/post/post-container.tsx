import { getPost } from "components/conversation/conversation.service";
import { ConversationPost } from "components/conversation/conversation.types";
import { Post } from "components/conversation/post/post";
import PostContextProvider from "components/conversation/post/post.context";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

interface Props {
  visibleCommentsCount?: number;
  reduceLargeText?: boolean;
  post?: ConversationPost;
  id: string;
}

const _PostContainer: React.FC<Props> = ({
  visibleCommentsCount,
  reduceLargeText,
  id,
  post
}) => {
  const { data, sendRequest } = useApiRequest({
    request: () => getPost({ id }),
    defaultData: post,
    fetchOnMount: !post
  });
  if (!data) return null;
  return (
    <PostContextProvider>
      <Post
        visibleCommentsCount={visibleCommentsCount}
        reduceLargeText={reduceLargeText}
        post={data}
        updateData={sendRequest}
      />
    </PostContextProvider>
  );
};

export const PostContainer = React.memo(_PostContainer);
