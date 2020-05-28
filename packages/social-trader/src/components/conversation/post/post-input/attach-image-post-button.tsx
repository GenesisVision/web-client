import { MediaIcon } from "components/conversation/icons/media.icon";
import { PostInputButton } from "components/conversation/post/post-input/post-input-button";
import React, { useCallback } from "react";

const _AttachImagePostButton: React.FC<Props> = ({ onClick }) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <PostInputButton onClick={handleClick}>
      <MediaIcon />
    </PostInputButton>
  );
};

interface Props {
  onClick: VoidFunction;
}

export const AttachImagePostButton = React.memo(_AttachImagePostButton);
