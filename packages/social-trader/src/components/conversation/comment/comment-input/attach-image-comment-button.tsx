import ImageBaseElement from "components/avatar/image-base.element";
import { CommentInputButton } from "components/conversation/comment/comment-input/comment-input-button";
import React, { useCallback } from "react";

const _AttachImageCommentButton: React.FC<Props> = ({ onClick }) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <CommentInputButton onClick={handleClick}>
      <ImageBaseElement
        src={
          "https://s1.iconbird.com/ico/2013/9/452/w512h4641380476740clip.png"
        }
      />
    </CommentInputButton>
  );
};

interface Props {
  onClick: VoidFunction;
}

export const AttachImageCommentButton = React.memo(_AttachImageCommentButton);
