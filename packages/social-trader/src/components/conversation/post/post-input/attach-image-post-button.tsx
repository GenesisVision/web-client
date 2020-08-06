import { MediaIcon } from "components/conversation/icons/media.icon";
import { PostInputButton } from "components/conversation/post/post-input/post-input-button";
import React, { useCallback } from "react";
import { Clickable, Sizeable } from "utils/types";

interface Props extends Sizeable, Clickable {}

const _AttachImagePostButton: React.FC<Props> = ({ size, onClick }) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <PostInputButton size={size} onClick={handleClick}>
      <MediaIcon />
    </PostInputButton>
  );
};

export const AttachImagePostButton = React.memo(_AttachImagePostButton);
