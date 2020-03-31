import { ConversationPost } from "components/conversation/conversation.types";
import { Post } from "components/conversation/post/post";
import DetailsBlock from "components/details/details-block";
import { withBlurLoader } from "decorators/with-blur-loader";
import React from "react";

const _PostList: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div>
      {data.map(post => (
        <Post key={post.id} post={post} updateData={updateData} />
      ))}
      {!data.length && (
        <DetailsBlock horizontalPaddings wide className="post">
          Feed is empty
        </DetailsBlock>
      )}
    </div>
  );
};

interface Props {
  updateData: VoidFunction;
  data: ConversationPost[];
}

export const PostList = withBlurLoader(React.memo(_PostList));
