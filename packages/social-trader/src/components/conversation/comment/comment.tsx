import "./comment.scss";

import { ConversationComment } from "components/conversation/conversation.types";
import { LikeContainer } from "components/conversation/like/like-container";
import { Message } from "components/conversation/message/message";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _Comment: React.FC<Props> = ({ comment: { id, message } }) => {
  return (
    <Row className="comment" center={false}>
      <RowItem className="comment__message">
        <Message message={message} />
      </RowItem>
      <RowItem className="comment__buttons">
        {message.personalDetails?.canClose && <div>x</div>}
        <LikeContainer
          id={id}
          canLike={message.personalDetails?.canLike}
          count={message.likesCount}
          liked={message.personalDetails?.liked}
        />
      </RowItem>
    </Row>
  );
};

interface Props {
  comment: ConversationComment;
}

export const Comment = React.memo(_Comment);
