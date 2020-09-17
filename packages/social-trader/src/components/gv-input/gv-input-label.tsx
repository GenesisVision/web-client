import React from "react";
import styled from "styled-components";

interface Props {
  shrink?: boolean;
}

export const GvInputLabel = styled.label<Props>`
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  top: 0;
  left: 0;
  position: absolute;
  transform-origin: top left;
  font-weight: normal;
  padding: 0;
  ${({ shrink }: Props) =>
    shrink
      ? "transform: scale(0.75) translate(0px, 1.5px);"
      : "transform: translate(0, 24px) scale(1)"}
`;
