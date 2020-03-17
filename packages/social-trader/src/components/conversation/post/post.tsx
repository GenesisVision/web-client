import "./post.scss";

import { Comment } from "components/conversation/comment/comment";
import { CommentInputContainer } from "components/conversation/comment/comment-input/comment-input-container";
import { ConversationRemoveButton } from "components/conversation/conversation-remove-button/conversation-remove-button";
import { ConversationPost } from "components/conversation/conversation.types";
import { Message } from "components/conversation/message/message";
import { PostButtons } from "components/conversation/post/post-buttons/post-buttons";
import DetailsBlock from "components/details/details-block";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _Post: React.FC<Props> = ({
  updateData,
  post: { images, date, text, id, comments, actions, likesCount, author }
}) => {
  return (
    <DetailsBlock horizontalPaddings wide>
      <Row center={false}>
        <Message images={images} date={date} text={text} author={author} />
        {actions?.canClose && (
          <RowItem>
            <ConversationRemoveButton id={id} onSuccess={updateData} />
          </RowItem>
        )}
      </Row>
      <PostButtons
        id={id}
        liked={actions?.canLike}
        likesCount={likesCount}
        canLike={actions?.canLike}
      />
      {!!comments.length && (
        <Row large>
          <div className="post__comments">
            {comments.map(comment => (
              <Comment
                updateData={updateData}
                key={comment.id}
                comment={comment}
              />
            ))}
          </div>
        </Row>
      )}
      {actions && actions.canComment && (
        <Row>
          <CommentInputContainer onSuccess={updateData} id={id} />
        </Row>
      )}
    </DetailsBlock>
  );
};

interface Props {
  updateData: VoidFunction;
  post: ConversationPost;
}

export const Post = React.memo(_Post);
