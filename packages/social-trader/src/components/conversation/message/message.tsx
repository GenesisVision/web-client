import Carousel from "components/carousels/carousel";
import {
  IConversationImage,
  IConversationUser
} from "components/conversation/conversation.types";
import { getImageSize } from "components/conversation/conversation-image/conversation-image.helpers";
import { ConversationImages } from "components/conversation/conversation-image/conversation-images";
import { ConversationUser } from "components/conversation/conversation-user/conversation-user";
import {
  ExcludedTagsUnderText,
  generateTagsComponents
} from "components/conversation/message/message.helpers";
import { MessageText } from "components/conversation/message/message-text";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { PostTag, SocialPostTagType } from "gv-api-web";
import React from "react";
import styled, { css } from "styled-components";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { adaptiveMargin } from "utils/style/mixins";
import { $paddingXsmall } from "utils/style/sizes";

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

interface IMessageItemStyleProps {
  onlyOffset?: boolean;
  bottomOffset?: boolean;
  overflowHidden?: boolean;
}

const MessageItemStyle = css<IMessageItemStyleProps>`
  width: auto;
  ${({ overflowHidden }) => overflowHidden && "overflow: hidden;"};
`;

const MessageRowItem = styled(Row)<IMessageItemStyleProps>`
  ${MessageItemStyle}
`;
const MessageRowItemItem = styled(RowItem)<IMessageItemStyleProps>`
  ${MessageItemStyle}
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
  const MessageItem = (row
    ? MessageRowItemItem
    : MessageRowItem) as React.ComponentType<any>;
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
        <MessageItem overflowHidden bottomOffset onlyOffset>
          <MessageText
            key={text}
            text={text}
            tags={tags}
            reduceLargeText={reduceLargeText}
          />
          {!!images.length && (
            <MessageImages wrap size={"small"}>
              <ConversationImages
                images={images}
                size={getImageSize(images.length)}
              />
            </MessageImages>
          )}
        </MessageItem>
      </MessageContainer>
      {!!tagsUnderText?.length && (
        <Row onlyOffset>
          <Carousel
            items={generateTagsComponents(tagsUnderText, true)}
            autoWidth
          />
        </Row>
      )}
      {!!repostTag?.length && <Row>{generateTagsComponents(repostTag)}</Row>}
    </div>
  );
};

export const Message = React.memo(_Message);
