import * as React from "react";
import { ReactNode } from "react";
import styled, { css } from "styled-components";
import {
  adaptivePadding,
  fontSize,
  verticalPaddings
} from "utils/style/mixins";
import {
  $fontSizeCommon,
  $paddingSmall,
  $paddingXsmall,
  $paddingXxsmall
} from "utils/style/sizes";
import { SizesType } from "utils/types";

interface Props {
  firstOffset?: boolean;
  height?: SizesType;
  className?: string;
  children?: ReactNode; // TODO fix React.memo type
}

export const tableCellStyle = css`
  text-align: left;
  cursor: default;
  box-sizing: border-box;
  align-items: center;
  flex-grow: 1;
  overflow: hidden; // Or flex might break
  list-style: none;
  font-weight: normal;
  white-space: nowrap;
  ${fontSize($fontSizeCommon)};
  ${adaptivePadding("right", $paddingXsmall, 2)};

  &:last-child {
    ${adaptivePadding("right", $paddingSmall)};
  }
`;

export const tableCellFirstOffsetStyle = css`
  &:first-child {
    ${adaptivePadding("left", $paddingSmall)};
  }
`;

const TableCell = styled.td<Props>`
  ${tableCellStyle};
  white-space: normal;

  ${({ firstOffset = true }) => {
    if (firstOffset) return tableCellFirstOffsetStyle;
  }};
  ${({ height = "middle" }) => {
    switch (height) {
      case "small":
        return verticalPaddings($paddingXxsmall);
      case "middle":
        return verticalPaddings($paddingXsmall);
    }
  }}
`;

export default TableCell;
