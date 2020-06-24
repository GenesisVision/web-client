import { ConversationRemoveButton } from "components/conversation/conversation-remove-button/conversation-remove-button";
import { ConversationComment } from "components/conversation/conversation.types";
import { LikeContainer } from "components/conversation/like/like-container";
import { Message } from "components/conversation/message/message";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

import styles from "./comment.module.scss";

const _Comment: React.FC<Props> = ({
  updateData,
  comment: { url, tags, images, date, text, id, actions, likesCount, author }
}) => {
  return (
    <div className={styles["comment"]}>
      <Row className={styles["comment__message"]} center={false}>
        <RowItem wide>
          <Message
            row={false}
            settingsBlock={
              actions?.canDelete ? (
                <RowItem>
                  <ConversationRemoveButton id={id} onSuccess={updateData} />
                </RowItem>
              ) : (
                <></>
              )
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
      </Row>
      <Row className={styles["comment__buttons"]}>
        <LikeContainer
          id={id}
          canLike={!!actions}
          count={likesCount}
          liked={actions?.isLiked}
        />
      </Row>
    </div>
  );
};

interface Props {
  updateData: VoidFunction;
  comment: ConversationComment;
}

export const Comment = React.memo(_Comment);
