import { RemoveIcon } from "components/conversation/icons/remove.icon";
import { PostContext } from "components/conversation/post/post.context";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

import styles from "./comment-input.module.scss";

export const CommentInputReply: React.FC = () => {
  const { replyState, setReplyState } = useContext(PostContext);
  const [t] = useTranslation();
  const handleCancel = useCallback(() => setReplyState(undefined), []);
  if (!replyState) return null;
  return (
    <Row className={styles["comment-input__reply"]}>
      <RowItem size={"small"}>
        <Text size={"small"} muted wrap={false}>
          {t("Reply to")} {replyState.name}
        </Text>
      </RowItem>
      <RowItem
        className={styles["comment-input__cancel-reply"]}
        onClick={handleCancel}
      >
        <RemoveIcon />
      </RowItem>
    </Row>
  );
};
