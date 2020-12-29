import React from "react";
import styled from "styled-components";
import { cursorPointer } from "utils/style/mixins";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onlyOffset?: boolean;
  hide?: boolean;
  center?: boolean;
  className?: string;
  wrap?: boolean;
  small?: boolean;
  middle?: boolean;
  large?: boolean;
}

export const Center = styled.div<Props>`
  display: ${({ hide, onlyOffset }: Props) => {
    if (hide) return "none";
    if (onlyOffset) return "block";
    return "flex";
  }};
  ${({ center = true }: Props) => center && "align-items: center"};
  flex-wrap: ${({ wrap }: Props) => (wrap ? "wrap" : "nowrap")};
  ${cursorPointer}
`;
