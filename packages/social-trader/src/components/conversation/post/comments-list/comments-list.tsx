import { Button } from "components/button/button";
import { Comment } from "components/conversation/comment/comment";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { Post } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import React from "react";

import styles from "./comments-list.module.scss";

interface Props {
  canReply?: boolean;
  visibleCommentsCount?: number;
  comments: Array<Post>;
  updateData: VoidFunction;
}

const VISIBLE_COMMENTS_COUNT = 3;

const _CommentsList: React.FC<Props> = ({
  canReply,
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
          <Button
            noPadding
            variant={"text"}
            size={"xlarge"}
            onClick={setViewAll}
          >
            View all
          </Button>
          &nbsp;
          <Text muted> ({comments.length - visibleCommentsCountInner})</Text>
        </Row>
      )}
      <Row onlyOffset>
        {visibleComments.map(comment => (
          <Comment
            canReply={canReply}
            updateData={updateData}
            key={comment.id}
            comment={comment}
          />
        ))}
      </Row>
    </div>
  );
};

export const CommentsList = React.memo(_CommentsList);
