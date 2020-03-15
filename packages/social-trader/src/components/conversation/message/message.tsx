import "./message.scss";

import { ConversationUser } from "components/conversation/conversation-user/conversation-user";
import {
  ConversationMessage,
  ConversationPost
} from "components/conversation/conversation.types";
import { LikeContainer } from "components/conversation/like/like-container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _Message: React.FC<IMessageProps> = ({
  showLike,
  message: { id, avatar, name, text, date, likesCount, personalDetails }
}) => {
  return (
    <Row center={false} className="message">
      <RowItem className="message__user">
        <ConversationUser avatar={avatar} username={name} date={date} />
      </RowItem>
      <RowItem className="message__text">{text}</RowItem>
      {showLike && (
        <RowItem className="message__like">
          <LikeContainer
            id={id}
            canLike={personalDetails?.canLike}
            count={likesCount}
            liked={personalDetails?.liked}
          />
        </RowItem>
      )}
    </Row>
  );
};

export interface IMessageProps {
  message: ConversationMessage | ConversationPost;
  showLike?: boolean;
}

export const Message = React.memo(_Message);
