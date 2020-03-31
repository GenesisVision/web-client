import { ConversationRemoveButton } from "components/conversation/conversation-remove-button/conversation-remove-button";
import { ConversationComment } from "components/conversation/conversation.types";
import { LikeContainer } from "components/conversation/like/like-container";
import { Message } from "components/conversation/message/message";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

import "./comment.scss";

const _Comment: React.FC<Props> = ({
  updateData,
  comment: { tags, images, date, text, id, actions, likesCount, author }
}) => {
  return (
    <Row className="comment">
      <Row className="comment__message" center={false}>
        <RowItem>
          <Message
            tags={tags}
            images={images}
            date={date}
            text={text}
            author={author}
          />
        </RowItem>
        {actions?.canDelete && (
          <RowItem>
            <ConversationRemoveButton id={id} onSuccess={updateData} />
          </RowItem>
        )}
      </Row>
      <Row className="comment__buttons">
        <LikeContainer
          id={id}
          canLike={!!actions}
          count={likesCount}
          liked={actions?.isLiked}
        />
      </Row>
    </Row>
  );
};

interface Props {
  updateData: VoidFunction;
  comment: ConversationComment;
}

export const Comment = React.memo(_Comment);
