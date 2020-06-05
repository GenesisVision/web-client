import classNames from "classnames";
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
import { HorizontalShadowList } from "components/horizontal-list-shadow-container/horizontal-shadow-list";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { PostTag } from "gv-api-web";
import React from "react";

import styles from "./message.module.scss";

const _Message: React.FC<IMessageProps> = ({
  row = true,
  tags,
  postId,
  images,
  text,
  date,
  author: { username, url, logoUrl }
}) => {
  const tagsUnderText = tags?.filter(({ type }) => type !== "Event");
  const MessageItem = row ? RowItem : Row;
  return (
    <div>
      <div
        className={classNames(styles["message"], {
          [styles["message--row"]]: row
        })}
      >
        <MessageItem className={styles["message__user"]}>
          <ConversationUser
            postId={postId}
            url={url}
            avatar={logoUrl}
            username={username}
            date={date}
          />
        </MessageItem>
        <MessageItem onlyOffset className={styles["message__text"]}>
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
            <Row wrap small className={styles["message__images"]}>
              {images.map((image, index) => (
                <RowItem bottomOffset key={index}>
                  <ConversationImage
                    index={index}
                    images={images}
                    size={getImageSize(images.length)}
                  />
                </RowItem>
              ))}
            </Row>
          )}
        </MessageItem>
      </div>
      {!!tagsUnderText?.length && (
        <Row>
          <HorizontalShadowList withScroll={false}>
            {generateTagsComponents(tagsUnderText)}
          </HorizontalShadowList>
        </Row>
      )}
    </div>
  );
};

export interface IMessageProps {
  row?: boolean;
  tags?: PostTag[];
  postId?: string;
  images: IConversationImage[];
  author: IConversationUser;
  text?: string;
  date: string | Date;
}

export const Message = React.memo(_Message);
