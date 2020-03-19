import { ConversationPost } from "components/conversation/conversation.types";
import { Post } from "components/conversation/post/post";
import { PostInputContainer } from "components/conversation/post/post-input/post-input.container";
import React from "react";
import { useSelector } from "react-redux";
import { idSelector } from "reducers/header-reducer";

import "./post-list.scss";

const _PostList: React.FC<Props> = ({ id, data, updateData }) => {
  const selfId = useSelector(idSelector);
  return (
    <div className="post-list">
      {selfId === id && <PostInputContainer onSuccess={updateData} />}
      {data.map(post => (
        <Post key={post.id} post={post} updateData={updateData} />
      ))}
    </div>
  );
};

interface Props {
  id: string;
  updateData: VoidFunction;
  data: ConversationPost[];
}

export const PostList = React.memo(_PostList);
