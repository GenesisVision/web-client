import "./post-list.scss";

import { ConversationPost } from "components/conversation/conversation.types";
import { Post } from "components/conversation/post/post";
import { PostInputContainer } from "components/conversation/post/post-input/post-input.container";
import { withBlurLoader } from "decorators/with-blur-loader";
import React from "react";

const _PostList: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className="post-list">
      <PostInputContainer onSuccess={updateData} />
      {data.map(post => (
        <Post key={post.id} post={post} updateData={updateData} />
      ))}
    </div>
  );
};

interface Props {
  updateData: VoidFunction;
  data: ConversationPost[];
}

export const PostList = withBlurLoader(React.memo(_PostList));
