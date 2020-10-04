import {
  mediaBreakpointLargeDesktop,
  mediaBreakpointTablet
} from "components/gv-styles/gv-media";
import { css } from "styled-components";

export const $gridMaxWidth = 1400;

export const $gridColumns = 12;

export const $gridGap = 40;
export const $gridGapMobile = 14;

export const landingContainerStyles = css`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  min-width: 320px;
  max-width: ${$gridMaxWidth};
  padding-left: 20px;
  padding-right: 20px;

  ${mediaBreakpointLargeDesktop(`
    max-width: 1600px;
    padding-left: 100px;
    padding-right: 100px;
  `)}
`;

export const grid = css`
  ${mediaBreakpointTablet(`
    display: grid;
    grid-column-gap: ${$gridGap};
    grid-template-columns: repeat(${$gridColumns}, 1fr);
  }
  `)};
`;

export const horizontalPadding = css`
  padding-top: 100px;
  padding-bottom: 100px;

  ${mediaBreakpointLargeDesktop(`
    padding-top: 140px;
    padding-bottom: 140px;
  `)}
`;

export const resetList = css`
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
`;
