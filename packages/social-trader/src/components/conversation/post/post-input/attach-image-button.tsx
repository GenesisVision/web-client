import ImageBaseElement from "components/avatar/image-base.element";
import { PostInputButton } from "components/conversation/post/post-input/post-input-button";
import React, { useCallback } from "react";

const AttachImageButton = () => {
  const handleClick = useCallback(() => {}, []);

  return (
    <PostInputButton onClick={handleClick}>
      <ImageBaseElement
        src={
          "https://s1.iconbird.com/ico/2013/9/452/w512h4641380476740clip.png"
        }
      />
    </PostInputButton>
  );
};

export default AttachImageButton;
