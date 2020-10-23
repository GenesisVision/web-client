import { ConversationComment } from "components/conversation/conversation.types";
import { LikeContainer } from "components/conversation/like/like-container";
import { Message } from "components/conversation/message/message";
import { MessageActions } from "components/conversation/message/message-actions/message-actions";
import { Reply } from "components/conversation/reply/reply";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { $borderColor } from "utils/style/colors";
import { adaptivePadding } from "utils/style/mixins";
import { $paddingSmall, $paddingXsmall } from "utils/style/sizes";

interface Props {
  canReply?: boolean;
  updateData: VoidFunction;
  comment: ConversationComment;
}

const Container = styled.div<{ highlighted?: boolean }>`
  ${adaptivePadding("top", $paddingXsmall)};
  ${adaptivePadding("left", $paddingSmall)};
  border-top: 1px solid ${$borderColor};
  flex-direction: column;

  &:not(:last-child) {
    ${adaptivePadding("bottom", $paddingXsmall)};
  }
  ${({ highlighted }) =>
    highlighted &&
    `
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.02) 0%,
        rgba(0, 0, 0, 0) 100%
      );
  `};
`;

const MessageContainer = styled(Row)`
  width: 100%;
  justify-content: space-between;
`;

const Buttons = styled(Row)`
  width: 100%;
  justify-content: flex-end;
`;

const _Comment: React.FC<Props> = ({
  canReply,
  updateData,
  comment: {
    likesUsers,
    isHighlighted,
    url,
    tags,
    images,
    date,
    text,
    id,
    personalDetails,
    likesCount,
    author
  }
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current !== null && isHighlighted) {
      const top = ref.current.getBoundingClientRect().top;
      window.scroll({ left: 0, top });
    }
  }, [ref.current]);

  return (
    <Container highlighted={isHighlighted} ref={ref}>
      <MessageContainer center={false}>
        <RowItem wide>
          <Message
            row={false}
            settingsBlock={
              <MessageActions
                url={url}
                actions={personalDetails}
                id={id}
                onApply={updateData}
                setDeleted={updateData}
              />
            }
            url={url}
            excludedTagsUnderText={["User"]}
            tags={tags}
            images={images}
            date={date}
            text={text}
            author={author}
          />
        </RowItem>
      </MessageContainer>
      <Buttons>
        <RowItem wide>{canReply && <Reply author={author} />}</RowItem>
        <RowItem>
          <LikeContainer
            likesUsers={likesUsers}
            id={id}
            canLike={!!personalDetails}
            count={likesCount}
            liked={personalDetails?.isLiked}
          />
        </RowItem>
      </Buttons>
    </Container>
  );
};

export const Comment = React.memo(_Comment);
