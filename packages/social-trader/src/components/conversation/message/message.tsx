import clsx from "clsx";
import { ConversationImage } from "components/conversation/conversation-image/conversation-image";
import { getImageSize } from "components/conversation/conversation-image/conversation-image.helpers";
import { ConversationUser } from "components/conversation/conversation-user/conversation-user";
import {
  IConversationImage,
  IConversationUser
} from "components/conversation/conversation.types";
import { MessageText } from "components/conversation/message/message-text";
import {
  ExcludedTagsUnderText,
  generateTagsComponents
} from "components/conversation/message/message.helpers";
import { HorizontalShadowList } from "components/horizontal-list-shadow-container/horizontal-shadow-list";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { PostTag, SocialPostTagType } from "gv-api-web";
import React from "react";

import styles from "./message.module.scss";

const _Message: React.FC<IMessageProps> = ({
  excludedTagsUnderText: excludedTagsUnderTextProp = [],
  reduceLargeText = true,
  settingsBlock,
  row = true,
  tags,
  url,
  images,
  text,
  date,
  author
}) => {
  const tagsUnderText = tags?.filter(
    ({ type }) =>
      ![...ExcludedTagsUnderText, ...excludedTagsUnderTextProp].includes(type)
  );
  const repostTag = tags?.filter(({ type }) => type === "Post");
  const MessageItem = row ? RowItem : Row;
  return (
    <div>
      <div
        className={clsx(styles["message"], {
          [styles["message--row"]]: row
        })}
      >
        <MessageItem
          bottomOffset
          center={false}
          className={styles["message__user"]}
        >
          <RowItem wide>
            <ConversationUser
              postUrl={url}
              authorUrl={author.url}
              avatar={author.logoUrl}
              username={author.username}
              date={date}
            />
          </RowItem>
          <RowItem>{settingsBlock}</RowItem>
        </MessageItem>
        <MessageItem bottomOffset onlyOffset>
          <MessageText
            text={text}
            tags={tags}
            reduceLargeText={reduceLargeText}
          />
          {!!images.length && (
            <Row wrap size={"small"} className={styles["message__images"]}>
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
      {!!repostTag?.length && <Row>{generateTagsComponents(repostTag)}</Row>}
    </div>
  );
};

export interface IMessageProps {
  excludedTagsUnderText?: SocialPostTagType[];
  reduceLargeText?: boolean;
  settingsBlock?: JSX.Element;
  row?: boolean;
  tags?: PostTag[];
  url: string;
  images: IConversationImage[];
  author: IConversationUser;
  text?: string;
  date: string | Date;
}

export const Message = React.memo(_Message);
