import { $commentInputButtonSize } from "components/conversation/comment/comment-input/comment-input.styles";
import React from "react";
import styled from "styled-components";

const _CommentInputButton = styled.div`
  cursor: pointer;
  width: ${$commentInputButtonSize}px;
  height: ${$commentInputButtonSize}px;

  & > img,
  & > svg {
    width: 100%;
    height: 100%;
  }
`;

export const CommentInputButton = React.memo(_CommentInputButton);
