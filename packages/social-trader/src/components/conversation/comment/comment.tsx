import "./comment.scss";

import { ConversationRemoveButton } from "components/conversation/conversation-remove-button/conversation-remove-button";
import { ConversationComment } from "components/conversation/conversation.types";
import { LikeContainer } from "components/conversation/like/like-container";
import { Message } from "components/conversation/message/message";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _Comment: React.FC<Props> = ({ comment: { id, message } }) => {
  return (
    <Row className="comment">
      <Row className="comment__message" center={false}>
        <RowItem>
          <Message message={message} />
        </RowItem>
        {message.personalDetails?.canClose && (
          <RowItem>
            <ConversationRemoveButton id={id} onSuccess={() => {}} />
          </RowItem>
        )}
      </Row>
      <Row className="comment__buttons">
        <LikeContainer
          id={id}
          canLike={message.personalDetails?.canLike}
          count={message.likesCount}
          liked={message.personalDetails?.liked}
        />
      </Row>
    </Row>
  );
};

interface Props {
  comment: ConversationComment;
}

export const Comment = React.memo(_Comment);
