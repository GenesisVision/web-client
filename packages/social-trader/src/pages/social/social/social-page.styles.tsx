import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapeTablet
} from "components/gv-styles/gv-media";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import styled, { css } from "styled-components";

const $desktopCenterWidth = "60%";
const $desktopSideBlockWidth = `calc((100% - ${$desktopCenterWidth}) / 2)`;

const $tabletCenterWidth = "70%";
const $tabletSideBlockWidth = `calc(100% - ${$tabletCenterWidth})`;

export const SocialPageStyledContainer = styled(Row)`
  justify-content: space-between;
`;

const sideBlockStyles = css`
  position: relative;
  ${mediaBreakpointLandscapeTablet(`width: ${$tabletSideBlockWidth};`)}
  ${mediaBreakpointDesktop(`width: ${$desktopSideBlockWidth};`)}
`;

const leftBlockStyles = css`
  display: none;
  ${mediaBreakpointLandscapeTablet(`display: block;`)}
`;

const rightBlockStyles = css`
  display: block;
  ${mediaBreakpointLandscapeTablet(`display: none;`)}
`;

export const SocialPageLeftBlock = styled(RowItem)`
  ${sideBlockStyles}
  ${leftBlockStyles}
`;

export const SocialPageRightBlock = styled(RowItem)`
  ${sideBlockStyles}
  ${rightBlockStyles}
`;

export const SocialPageFeedContainer = styled(RowItem)`
  width: 100%;
  ${mediaBreakpointLandscapeTablet(`width: ${$tabletCenterWidth};`)}
  ${mediaBreakpointDesktop(`width: ${$tabletCenterWidth};`)}
`;
