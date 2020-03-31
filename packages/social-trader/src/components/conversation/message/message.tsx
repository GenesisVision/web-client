import { ConversationImage } from "components/conversation/conversation-image/conversation-image";
import { getImageSize } from "components/conversation/conversation-image/conversation-image.helpers";
import { ConversationUser } from "components/conversation/conversation-user/conversation-user";
import {
  IConversationImage,
  IConversationUser
} from "components/conversation/conversation.types";
import { generateTagsComponents } from "components/conversation/message/message.helpers";
import {
  inTextComponentsMap,
  parseToTsx
} from "components/conversation/tag/parse-to-tsx";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { PostTag } from "gv-api-web";
import React from "react";

import "./message.scss";

const _Message: React.FC<IMessageProps> = ({
  tags,
  postId,
  images,
  text,
  date,
  author: { username, url, logoUrl }
}) => {
  return (
    <Row center={false} className="message">
      <RowItem className="message__user">
        <ConversationUser
          postId={postId}
          url={url}
          avatar={logoUrl}
          username={username}
          date={date}
        />
      </RowItem>
      <RowItem className="message__text">
        {text && (
          <Row>
            <div>
              {parseToTsx({
                tags,
                text,
                map: inTextComponentsMap
              })}
            </div>
          </Row>
        )}
        {!!images.length && (
          <Row wrap small className="message__images">
            {images.map((image, index) => (
              <RowItem bottomOffset key={image.image}>
                <ConversationImage
                  index={index}
                  images={images}
                  size={getImageSize(images.length)}
                />
              </RowItem>
            ))}
          </Row>
        )}
        {!!tags?.length && (
          <Row wrap small>
            {generateTagsComponents(tags)}
          </Row>
        )}
      </RowItem>
    </Row>
  );
};

export interface IMessageProps {
  tags?: PostTag[];
  postId?: string;
  images: IConversationImage[];
  author: IConversationUser;
  text?: string;
  date: string | Date;
}

export const Message = React.memo(_Message);
