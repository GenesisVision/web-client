import { CommentInputButton } from "components/conversation/comment/comment-input/comment-input-button";
import { MediaIcon } from "components/conversation/icons/media.icon";
import React, { useCallback } from "react";

const _AttachImageCommentButton: React.FC<Props> = ({ onClick }) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <CommentInputButton onClick={handleClick}>
      <MediaIcon />
    </CommentInputButton>
  );
};

interface Props {
  onClick: VoidFunction;
}

export const AttachImageCommentButton = React.memo(_AttachImageCommentButton);
