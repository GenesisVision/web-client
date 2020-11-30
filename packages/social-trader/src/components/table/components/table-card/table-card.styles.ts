import { IWithOffset } from "components/table/components/table-card/table-card";
import { css } from "styled-components";
import { $rowColor, $textAccentColor } from "utils/style/colors";
import {
  mediaBreakpointLandscapePhone,
  mediaBreakpointTablet
} from "utils/style/media";
import { fontSize, height, link } from "utils/style/mixins";
import {
  $borderRadiusMiddle,
  $fontSizeParagraph,
  $paddingSmall,
  $paddingXsmall
} from "utils/style/sizes";

const $actionSize = 30;

export const tableCardTitleWrapperStyle = css`
  padding-top: 3px;
  max-width: calc(100% - ${$actionSize + 5}px);
`;
export const tableCardActionsIconStyle = css`
  width: ${$actionSize}px;
  height: ${$actionSize}px;
`;

export const tableCardTitleStyles = css`
  ${link($textAccentColor)};
  ${fontSize($fontSizeParagraph)};
  word-break: break-word;
  display: block;
  padding-bottom: 10px;
  ${mediaBreakpointLandscapePhone(`padding-bottom: 0;`)};
`;

export const tableCardContainerStyles = css<IWithOffset>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: ${$paddingXsmall}px;
  flex-grow: 1;
  ${height(372, 1.2)};
  background: ${$rowColor};
  ${mediaBreakpointLandscapePhone(`
    border-radius: ${$borderRadiusMiddle}px;
    min-width: 312px;
    width: calc(50% - ${$paddingSmall}px / 2);
    padding: ${$paddingSmall}px ${$paddingXsmall}px;
    `)};
  ${mediaBreakpointTablet(`flex-grow: 0;`)};
  @media (min-width: 1075px) {
    width: calc(33.33% - ${$paddingSmall}px / 2);
  }
  @media (min-width: 1400px) {
    width: 312px;
  }
  ${({ withOffset = true }) =>
    withOffset
      ? `
    margin-bottom: ${$paddingSmall / 2}px;
    ${mediaBreakpointLandscapePhone(`
      margin-right: ${$paddingSmall / 2}px
      `)};
    `
      : `margin:0;`};
`;
