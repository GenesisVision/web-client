import { $paddingSmall, $paddingXxsmall } from "components/gv-styles/gv-sizes";
import React from "react";
import styled from "styled-components";
import { horizontalPaddings, verticalPaddings } from "utils/style/style-mixins";

interface Props {
  leftAlign?: boolean;
  className?: string;
  type?: "list";
}

export const PopoverContent = styled.div<Props>`
  box-sizing: border-box;
  max-height: 50vh;
  overflow: auto;
  ${({ type }) =>
    type === "list" &&
    `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-x: auto;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `}
`;

export const PopoverContentListItem = styled.div`
  box-sizing: border-box;
  width: 100%;
  ${horizontalPaddings($paddingSmall)};
  ${verticalPaddings($paddingXxsmall)};
`;
