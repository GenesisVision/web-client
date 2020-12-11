import PagerLinkButton from "components/pager/pager-link-button";
import { RowItem } from "components/row-item/row-item";
import React from "react";
import styled, { css } from "styled-components";
import { $labelColor, $textLightColor } from "utils/style/colors";
import {
  adaptiveBorderRadius,
  fontSize,
  height,
  transition,
  width
} from "utils/style/mixins";
import { $fontSizeCommon } from "utils/style/sizes";

const $pagerButtonSize = 40;

const commonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-weight: 800;
  color: ${$labelColor};
  ${fontSize($fontSizeCommon)}
  ${width($pagerButtonSize)};
  ${height($pagerButtonSize)};
`;

export const PagerSeparatorItem = styled(RowItem)`
  ${commonStyles}
`;
export const PagerSeparator: React.FC = () => (
  <PagerSeparatorItem size={"small"}>...</PagerSeparatorItem>
);

export const PagerButtonStyles = css<{ current?: boolean }>`
  ${commonStyles}
  align-items: center;
  cursor: pointer;
  ${adaptiveBorderRadius(8)};
  ${transition("color", "background-color")};
  &:hover {
    color: ${$textLightColor};
    background-color: #1b2a35;
  }
  ${({ current }) =>
    current &&
    `
      background-color: #1b2a35;
      color: ${$textLightColor};
      `}
`;

export const PagerStyledButton = styled.div<{ current?: boolean }>`
  ${PagerButtonStyles}
`;

export const PagerStyledLink = styled(PagerLinkButton)<{ current?: boolean }>`
  ${PagerButtonStyles}
`;
