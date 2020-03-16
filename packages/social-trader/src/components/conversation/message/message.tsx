import "./message.scss";

import { ConversationUser } from "components/conversation/conversation-user/conversation-user";
import { ConversationMessage } from "components/conversation/conversation.types";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _Message: React.FC<IMessageProps> = ({
  message: {
    text,
    date,
    user: { avatar, name }
  }
}) => {
  return (
    <Row center={false} className="message">
      <RowItem className="message__user">
        <ConversationUser avatar={avatar} username={name} date={date} />
      </RowItem>
      <RowItem className="message__text">{text}</RowItem>
    </Row>
  );
};

export interface IMessageProps {
  message: ConversationMessage;
}

export const Message = React.memo(_Message);
