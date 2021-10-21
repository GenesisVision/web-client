import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import styled, { css } from "styled-components";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapeTablet
} from "utils/style/media";
import { transition } from "utils/style/mixins";

const $desktopCenterWidth = "60%";
const $desktopMargin = "20px";
const $desktopCenterCalcWidth = `calc(${$desktopCenterWidth} - ${$desktopMargin})`;
const $desktopSideBlockWidth = `calc((100% - ${$desktopCenterWidth}) / 2)`;
const $desktopLeftSideBlockWidth = `calc((100% - ${$desktopCenterWidth}) / 2 - ${$desktopMargin})`;

const $tabletCenterWidth = "70%";
const $tabletSideBlockWidth = `calc(100% - ${$tabletCenterWidth})`;
const $tabletLeftSideBlockWidth = `calc(100% - ${$tabletCenterWidth} - ${$desktopMargin})`;

export const SocialPageStyledContainer = styled(Row)`
  justify-content: space-between;
`;

const leftBlockStyles = css`
  display: none;
  ${mediaBreakpointLandscapeTablet(`display: block;`)}
  position: relative;
  ${mediaBreakpointLandscapeTablet(`width: ${$tabletLeftSideBlockWidth};`)}
  ${mediaBreakpointDesktop(`width: ${$desktopLeftSideBlockWidth};`)}
`;

const rightBlockStyles = css`
  display: none;
  ${mediaBreakpointDesktop(`display: block;`)}
  position: relative;
  ${mediaBreakpointLandscapeTablet(`width: ${$tabletSideBlockWidth};`)}
  ${mediaBreakpointDesktop(`width: ${$desktopSideBlockWidth};`)}
`;

export const SocialPageLeftBlock = styled(RowItem)`
  ${leftBlockStyles}
`;

export const SocialPageRightBlock = styled(RowItem)`
  ${rightBlockStyles}
`;

export const SocialPageFeedContainer = styled(RowItem)`
  width: 100%;
  ${mediaBreakpointLandscapeTablet(`width: ${$tabletCenterWidth};`)}
  ${mediaBreakpointDesktop(`width: ${$desktopCenterCalcWidth};`)}
`;

export const SocialPageTabsContainer = styled.div<{ open?: boolean }>`
  overflow: hidden;
  ${transition("width")};
  width: ${({ open }) => (open ? "100%" : 0)};
`;

export const SocialPageSearchContainer = styled.div<{ open?: boolean }>`
  height: 34px;
  ${transition("width")};
  width: ${({ open }) => (open ? "100%" : "40px")};
`;

export const SocialPageSearchButton = styled.div`
  cursor: pointer;
`;
