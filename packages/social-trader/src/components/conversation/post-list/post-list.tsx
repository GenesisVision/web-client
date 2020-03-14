import "./post-list.scss";

import { ConversationPost } from "components/conversation/conversation.types";
import { Post } from "components/conversation/post/post";
import { PostInputContainer } from "components/conversation/post/post-input/post-input.container";
import React from "react";

const _PostList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="post-list">
      <PostInputContainer />
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

interface Props {
  posts: ConversationPost[];
}

export const PostList = React.memo(_PostList);
