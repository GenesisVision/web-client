import { $cancelReplyButtonSize } from "components/conversation/comment/comment-input/comment-input.styles";
import { RemoveIcon } from "components/conversation/icons/remove.icon";
import { PostContext } from "components/conversation/post/post.context";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Container = styled(Row)`
  height: ${$cancelReplyButtonSize}px;
  line-height: ${$cancelReplyButtonSize}px;
`;

const Cancel = styled(RowItem)`
  width: ${$cancelReplyButtonSize}px;
  height: ${$cancelReplyButtonSize}px;
`;

export const CommentInputReply: React.FC = () => {
  const { replyState, setReplyState } = useContext(PostContext);
  const [t] = useTranslation();
  const handleCancel = useCallback(() => setReplyState(undefined), []);
  if (!replyState) return null;
  return (
    <Container>
      <RowItem size={"small"}>
        <Text size={"small"} muted wrap={false}>
          {t("Reply to")} {replyState.name}
        </Text>
      </RowItem>
      <Cancel onClick={handleCancel}>
        <RemoveIcon />
      </Cancel>
    </Container>
  );
};
