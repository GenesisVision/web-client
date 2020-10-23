import React from "react";
import styled from "styled-components";
import { $labelColor } from "utils/style/colors";
import { transition } from "utils/style/mixins";

interface Props {
  className?: string;
  disabled?: boolean;
}

export const ButtonIcon = styled.div<Props>`
  &,
  & svg {
    width: 100%;
    height: 100%;
    display: block;
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  }

  svg [stroke] {
    ${transition("stroke")};
    stroke: ${$labelColor};
  }

  svg [fill] {
    ${transition("fill")};
    fill: ${$labelColor};
  }

  &:hover {
    ${({ disabled }) =>
      !disabled &&
      `
      svg [stroke] {
        stroke: white;
      }
      svg [fill] {
        fill: white;
      }
    `};
  }
`;
