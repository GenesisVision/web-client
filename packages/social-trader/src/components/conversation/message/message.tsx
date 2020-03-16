import "./message.scss";

import { ConversationImage } from "components/conversation/conversation-image/conversation-image";
import { ConversationUser } from "components/conversation/conversation-user/conversation-user";
import { ConversationMessage } from "components/conversation/conversation.types";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _Message: React.FC<IMessageProps> = ({
  message: {
    images,
    text,
    date,
    user: { avatar, name }
  }
}) => {
  return (
    <Row center={false}>
      <RowItem className="message__user">
        <ConversationUser avatar={avatar} username={name} date={date} />
      </RowItem>
      <RowItem className="message__text">
        <Row>{text}</Row>
        {!!images.length && (
          <Row wrap small className="message__images">
            {images.map(image => (
              <RowItem bottomOffset>
                <ConversationImage image={image} />
              </RowItem>
            ))}
          </Row>
        )}
      </RowItem>
    </Row>
  );
};

export interface IMessageProps {
  message: ConversationMessage;
}

export const Message = React.memo(_Message);
