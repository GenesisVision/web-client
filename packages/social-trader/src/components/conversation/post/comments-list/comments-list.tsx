import { Comment } from "components/conversation/comment/comment";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { MutedText } from "components/muted-text/muted-text";
import { Row } from "components/row/row";
import { Post } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import React from "react";

import styles from "./comments-list.module.scss";

interface Props {
  visibleCommentsCount?: number;
  comments: Array<Post>;
  updateData: VoidFunction;
}

const VISIBLE_COMMENTS_COUNT = 3;

const _CommentsList: React.FC<Props> = ({
  visibleCommentsCount,
  comments,
  updateData
}) => {
  const visibleCommentsCountInner =
    visibleCommentsCount || VISIBLE_COMMENTS_COUNT;
  const [isViewAll, setViewAll] = useIsOpen(
    comments.length <= visibleCommentsCountInner
  );
  const visibleComments = isViewAll
    ? comments
    : comments.slice(comments.length - visibleCommentsCountInner);
  return (
    <div className={styles["comments-list__comments"]}>
      {!isViewAll && (
        <Row className={styles["comments-list__view-all-button-container"]}>
          <GVButton
            noPadding
            variant={"text"}
            size={GV_BTN_SIZE.BIG}
            onClick={setViewAll}
          >
            View all
          </GVButton>
          &nbsp;
          <MutedText>
            {" "}
            ({comments.length - visibleCommentsCountInner})
          </MutedText>
        </Row>
      )}
      {visibleComments.map(comment => (
        <Comment updateData={updateData} key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export const CommentsList = React.memo(_CommentsList);
