import { ConversationPost } from "components/conversation/conversation.types";
import { Post } from "components/conversation/post/post";
import { PostInputContainer } from "components/conversation/post/post-input/post-input.container";
import React from "react";

import "./post-list.scss";

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

export const PostList = React.memo(_PostList);
