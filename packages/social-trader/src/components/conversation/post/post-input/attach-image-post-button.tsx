import { MediaIcon } from "components/conversation/icons/media.icon";
import { PostInputButton } from "components/conversation/post/post-input/post-input-button";
import React, { useCallback } from "react";
import { SizesType } from "utils/types";

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

interface Props {
  size?: SizesType;
  onClick: VoidFunction;
}

export const AttachImagePostButton = React.memo(_AttachImagePostButton);
