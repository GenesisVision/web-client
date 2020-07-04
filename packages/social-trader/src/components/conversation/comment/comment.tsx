import clsx from "clsx";
import { ConversationRemoveButton } from "components/conversation/conversation-remove-button/conversation-remove-button";
import { ConversationComment } from "components/conversation/conversation.types";
import { LikeContainer } from "components/conversation/like/like-container";
import { Message } from "components/conversation/message/message";
import { Reply } from "components/conversation/reply/reply";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React, { useEffect, useRef } from "react";

import styles from "./comment.module.scss";

const _Comment: React.FC<Props> = ({
  updateData,
  comment: {
    isHighlighted,
    url,
    tags,
    images,
    date,
    text,
    id,
    actions,
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
    <div
      ref={ref}
      className={clsx(styles["comment"], {
        [styles["comment--highlighted"]]: isHighlighted
      })}
    >
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
        <RowItem wide>{actions && <Reply author={author} />}</RowItem>
        <RowItem>
          <LikeContainer
            id={id}
            canLike={!!actions}
            count={likesCount}
            liked={actions?.isLiked}
          />
        </RowItem>
      </Row>
    </div>
  );
};

interface Props {
  updateData: VoidFunction;
  comment: ConversationComment;
}

export const Comment = React.memo(_Comment);
