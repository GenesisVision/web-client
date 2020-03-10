import "./post-list.scss";

import { ConversationPost } from "components/conversation/conversation.types";
import { Post } from "components/conversation/post/post";
import { PostInput } from "components/conversation/post/post-input/post-input";
import React from "react";

const _PostList: React.FC<Props> = ({ posts }) => {
  return (
    <div>
      <PostInput />
      {posts.map(post => (
        <Post post={post} />
      ))}
    </div>
  );
};

interface Props {
  posts: ConversationPost[];
}

export const PostList = React.memo(_PostList);
