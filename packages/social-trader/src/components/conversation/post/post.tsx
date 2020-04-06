import { Center } from "components/center/center";
import { Comment } from "components/conversation/comment/comment";
import { CommentInputContainer } from "components/conversation/comment/comment-input/comment-input-container";
import { ConversationPinButton } from "components/conversation/conversation-pin-button/conversation-pin-button";
import { ConversationRemoveButton } from "components/conversation/conversation-remove-button/conversation-remove-button";
import { ConversationPost } from "components/conversation/conversation.types";
import { Message } from "components/conversation/message/message";
import { PostButtons } from "components/conversation/post/post-buttons/post-buttons";
import { DefaultBlock } from "components/default.block/default.block";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

import "./post.scss";

const _Post: React.FC<Props> = ({
  updateData,
  post: {
    rePostsCount,
    isPinned,
    images,
    date,
    text,
    id,
    comments,
    actions,
    likesCount,
    author,
    tags
  }
}) => {
  return (
    <DefaultBlock solid wide className="post">
      <Row center={false}>
        <RowItem wide>
          <Message
            tags={tags}
            postId={id}
            images={images}
            date={date}
            text={text}
            author={author}
          />
        </RowItem>
        {actions?.canDelete && (
          <RowItem>
            <Center>
              <RowItem>
                <ConversationPinButton
                  id={id}
                  value={isPinned}
                  onSuccess={updateData}
                />
              </RowItem>
              <RowItem>
                <ConversationRemoveButton id={id} onSuccess={updateData} />
              </RowItem>
            </Center>
          </RowItem>
        )}
      </Row>
      <PostButtons
        rePostsCount={rePostsCount}
        onApply={updateData}
        id={id}
        liked={actions?.isLiked}
        likesCount={likesCount}
        canLike={!!actions}
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
      {actions && (
        <Row>
          <CommentInputContainer onSuccess={updateData} id={id} />
        </Row>
      )}
    </DefaultBlock>
  );
};

interface Props {
  updateData: VoidFunction;
  post: ConversationPost;
}

export const Post = React.memo(_Post);
