import { ConversationPost } from "components/conversation/conversation.types";
import { Post } from "components/conversation/post/post";
import { DefaultBlock } from "components/default.block/default.block";
import { Row } from "components/row/row";
import { withBlurLoader } from "decorators/with-blur-loader";
import React from "react";

const _PostList: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div>
      {data.map(post => (
        <Row>
          <Post key={post.id} post={post} updateData={updateData} />
        </Row>
      ))}
      {!data.length && (
        <DefaultBlock solid wide>
          Feed is empty
        </DefaultBlock>
      )}
    </div>
  );
};

interface Props {
  updateData: VoidFunction;
  data: ConversationPost[];
}

export const PostList = withBlurLoader(React.memo(_PostList));
