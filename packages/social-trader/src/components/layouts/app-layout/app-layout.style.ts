import { mediaBreakpointLandscapePhone } from "components/gv-styles/gv-media";
import {
  $paddingBig,
  $paddingBigMobile,
  $paddingSmallMobile,
  $paddingXsmall,
  $paddingXsmallMobile
} from "components/gv-styles/gv-sizes";
import { css } from "styled-components";
import { LARGE_DESKTOP } from "utils/breakpoints";
import { adaptiveMargin } from "utils/style/style-mixins";

const PAGE_WIDTH = LARGE_DESKTOP - 40;

const appHorizontalPaddings = css`
  padding-left: ${$paddingSmallMobile}px;
  padding-right: ${$paddingSmallMobile}px;
  ${mediaBreakpointLandscapePhone(`
    padding-left: ${$paddingXsmall}px;
    padding-right :${$paddingXsmall}px;
  `)}
  @media (min-width: ${PAGE_WIDTH}px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const appStyles = css`
  margin: 0 auto;
  @media (min-width: ${PAGE_WIDTH}px) {
    max-width: ${PAGE_WIDTH - $paddingXsmall * 2}px;
  }
`;

export const appWrapperStyles = css`
  position: relative;
  min-height: 100vh;
`;

export const appHeaderStyles = css`
  ${appHorizontalPaddings}
  padding-top: ${$paddingXsmallMobile}px;
  padding-bottom: ${$paddingXsmallMobile}px;
  ${adaptiveMargin("bottom", $paddingXsmall)};

  ${mediaBreakpointLandscapePhone(`
    padding-top: ${$paddingXsmall}px;
    padding-bottom: ${$paddingXsmall}px;
  `)}
`;

export const appMainStyles = css`
  ${appHorizontalPaddings}
  padding-bottom: ${$paddingBigMobile}px;

  ${mediaBreakpointLandscapePhone(`
    padding-bottom: ${$paddingBig}px;
  `)}
`;
