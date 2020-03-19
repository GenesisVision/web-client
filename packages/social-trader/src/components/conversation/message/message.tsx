import {
  ConversationImage,
  getImageSize
} from "components/conversation/conversation-image/conversation-image";
import { ConversationUser } from "components/conversation/conversation-user/conversation-user";
import {
  IConversationImage,
  IConversationUser
} from "components/conversation/conversation.types";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

import "./message.scss";

const _Message: React.FC<IMessageProps> = ({
  images,
  text,
  date,
  author: { username }
}) => {
  return (
    <Row center={false} className="message">
      <RowItem className="message__user">
        <ConversationUser avatar={""} username={username} date={date} />
      </RowItem>
      <RowItem className="message__text">
        {text && <Row>{text}</Row>}
        {!!images.length && (
          <Row wrap small className="message__images">
            {images.map(image => (
              <RowItem bottomOffset>
                <ConversationImage
                  image={image}
                  size={getImageSize(images.length)}
                />
              </RowItem>
            ))}
          </Row>
        )}
      </RowItem>
    </Row>
  );
};

export interface IMessageProps {
  images: IConversationImage[];
  author: IConversationUser;
  text?: string;
  date: string | Date;
}

export const Message = React.memo(_Message);
