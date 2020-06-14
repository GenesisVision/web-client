import classNames from "classnames";
import { ConversationImage } from "components/conversation/conversation-image/conversation-image";
import { getImageSize } from "components/conversation/conversation-image/conversation-image.helpers";
import { ConversationUser } from "components/conversation/conversation-user/conversation-user";
import {
  IConversationImage,
  IConversationUser
} from "components/conversation/conversation.types";
import {
  generateTagsComponents,
  reduceByBreaks,
  reduceBySymbolsCount
} from "components/conversation/message/message.helpers";
import {
  inTextComponentsMap,
  parseToTsx
} from "components/conversation/tag/parse-to-tsx";
import GVButton from "components/gv-button";
import { HorizontalShadowList } from "components/horizontal-list-shadow-container/horizontal-shadow-list";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { PostTag } from "gv-api-web";
import React, { useEffect, useState } from "react";
import { getLongWordsCount } from "utils/helpers";

import styles from "./message.module.scss";

const _Message: React.FC<IMessageProps> = ({
  reduceLargeText = true,
  settingsBlock,
  row = true,
  tags,
  postId,
  images,
  text,
  date,
  author: { username, url, logoUrl }
}) => {
  const [textToRender, setTextToRender] = useState<string | undefined>();
  const [isTextExpanded, setTextExpandState] = useState<boolean | undefined>();

  useEffect(() => {
    if (!text) return;
    const newText = reduceLargeText
      ? reduceByBreaks(
          reduceBySymbolsCount(text, setTextExpandState),
          setTextExpandState
        )
      : text;

    setTextToRender(newText);
  }, [text]);

  useEffect(() => {
    if (isTextExpanded) setTextToRender(text);
  }, [isTextExpanded]);

  const tagsUnderText = tags
    ?.filter(({ type }) => type !== "Event")
    .filter(({ type }) => type !== "Post");
  const repostTag = tags?.filter(({ type }) => type === "Post");
  const MessageItem = row ? RowItem : Row;
  const hasLongWords = textToRender && !!getLongWordsCount(textToRender);
  return (
    <div>
      <div
        className={classNames(styles["message"], {
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
              postId={postId}
              url={url}
              avatar={logoUrl}
              username={username}
              date={date}
            />
          </RowItem>
          <RowItem>{settingsBlock}</RowItem>
        </MessageItem>
        <MessageItem
          bottomOffset
          onlyOffset
          className={classNames(styles["message__text"], {
            [styles["message__text--break-word"]]: hasLongWords
          })}
        >
          {textToRender && (
            <Row>
              <div>
                {parseToTsx({
                  tags,
                  text: textToRender,
                  map: inTextComponentsMap
                })}
                {isTextExpanded === false && (
                  <GVButton
                    noPadding
                    variant={"text"}
                    onClick={() => setTextExpandState(true)}
                  >
                    <b>Expand</b>
                  </GVButton>
                )}
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
      {!!repostTag?.length && <Row>{generateTagsComponents(repostTag)}</Row>}
    </div>
  );
};

export interface IMessageProps {
  reduceLargeText?: boolean;
  settingsBlock?: JSX.Element;
  row?: boolean;
  tags?: PostTag[];
  postId?: string;
  images: IConversationImage[];
  author: IConversationUser;
  text?: string;
  date: string | Date;
}

export const Message = React.memo(_Message);
