import { CommentInputButton } from "components/conversation/comment/comment-input/comment-input-button";
import { MediaIcon } from "components/conversation/icons/media.icon";
import React, { useCallback } from "react";
import { Clickable } from "utils/types";

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

interface Props extends Clickable {}

export const AttachImageCommentButton = React.memo(_AttachImageCommentButton);
