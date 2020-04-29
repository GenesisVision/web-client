import { Comment } from "components/conversation/comment/comment";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { MutedText } from "components/muted-text/muted-text";
import { Row } from "components/row/row";
import { Post } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import React from "react";

interface Props {
  comments: Array<Post>;
  updateData: VoidFunction;
}

const VISIBLE_COMMENTS_COUNT = 3;

const _CommentsList: React.FC<Props> = ({ comments, updateData }) => {
  const [isViewAll, setViewAll] = useIsOpen(
    comments.length <= VISIBLE_COMMENTS_COUNT
  );
  const visibleComments = isViewAll
    ? comments
    : comments.slice(comments.length - VISIBLE_COMMENTS_COUNT);
  return (
    <div className="post__comments">
      {!isViewAll && (
        <Row className="post__view-all-button-container">
          <GVButton
            noPadding
            variant={"text"}
            size={GV_BTN_SIZE.BIG}
            onClick={setViewAll}
          >
            View all
          </GVButton>
          &nbsp;
          <MutedText> ({comments.length - VISIBLE_COMMENTS_COUNT})</MutedText>
        </Row>
      )}
      {visibleComments.map(comment => (
        <Row onlyOffset>
          <Comment updateData={updateData} key={comment.id} comment={comment} />
        </Row>
      ))}
    </div>
  );
};

export const CommentsList = React.memo(_CommentsList);
