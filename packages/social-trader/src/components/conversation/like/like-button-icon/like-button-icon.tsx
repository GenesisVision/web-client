import { LikeIcon } from "components/conversation/icons/like.icon";
import React from "react";
import styled from "styled-components";
import { pSBC } from "utils/psbc";
import { $labelColor, $primaryColor } from "utils/style/colors";
import { transition } from "utils/style/mixins";

interface Props {
  disabled?: boolean;
  liked: boolean;
}

const Container = styled.div<Props>`
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  &,
  & svg {
    width: 100%;
    height: 100%;
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    display: block;
  }
  path {
    ${transition("stroke", "fill")};
    fill: ${({ liked }) => (liked ? $primaryColor : "none")};
    stroke: ${({ liked }) => (liked ? $primaryColor : $labelColor)};
  }
  ${({ disabled, liked }) =>
    !disabled &&
    `
      &:hover {
        path {
          fill: ${liked ? pSBC(0.1, $primaryColor) : "none"};
          stroke: ${liked ? pSBC(0.1, $primaryColor) : "white"};
        }
      }
  `};
`;

export const LikeButtonIcon: React.FC<Props> = ({ liked, disabled }) => {
  return (
    <Container liked={liked} disabled={disabled}>
      <LikeIcon />
    </Container>
  );
};
