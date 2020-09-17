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
import { mediaBreakpointLandscapePhone } from "components/gv-styles/gv-media";
import { $paddingXsmall } from "components/gv-styles/gv-sizes";
import { HorizontalShadowList } from "components/horizontal-list-shadow-container/horizontal-shadow-list";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { PostTag, SocialPostTagType } from "gv-api-web";
import React from "react";
import styled from "styled-components";
import { adaptiveMargin } from "utils/style/style-mixins";

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

export const MessageContainer = styled.div<{ row?: boolean }>`
  width: 100%;
  flex-wrap: wrap;
  ${mediaBreakpointLandscapePhone("flex-wrap: nowrap;")};
  ${({ row }) =>
    row &&
    `
    display: flex;
    ${adaptiveMargin("bottom", -$paddingXsmall)};
  `};
`;

export const MessageImages = styled(Row)`
  ${adaptiveMargin("bottom", -$paddingXsmall)};
`;

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
  const MessageItem = styled(row ? RowItem : Row)<{ bottomOffset?: boolean }>`
    width: auto;
  `;
  const MessageItemText = styled(MessageItem)`
    overflow: hidden;
  `;
  return (
    <div>
      <MessageContainer row={row}>
        <MessageItem bottomOffset center={false}>
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
        <MessageItemText bottomOffset onlyOffset>
          <MessageText
            key={text}
            text={text}
            tags={tags}
            reduceLargeText={reduceLargeText}
          />
          {!!images.length && (
            <MessageImages wrap size={"small"}>
              {images.map((image, index) => (
                <RowItem bottomOffset key={index}>
                  <ConversationImage
                    index={index}
                    images={images}
                    size={getImageSize(images.length)}
                  />
                </RowItem>
              ))}
            </MessageImages>
          )}
        </MessageItemText>
      </MessageContainer>
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

export const Message = React.memo(_Message);
