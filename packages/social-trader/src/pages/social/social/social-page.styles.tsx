import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import styled, { css } from "styled-components";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapeTablet
} from "utils/style/media";
import { transition } from "utils/style/mixins";

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
  display: none;
  ${mediaBreakpointDesktop(`display: block;`)}
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
