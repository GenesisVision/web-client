import { css } from "styled-components";
import {
  mediaBreakpointLargeDesktop,
  mediaBreakpointTablet
} from "utils/style/media";

export const $gridMaxWidth = 1400;

export const $gridColumns = 12;

export const $gridGap = 40;
export const $gridGapMobile = 14;

export const landingContainer = css`
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

export const resetButton = css`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  text-align: inherit;
  outline: none;
  cursor: pointer;
  background-color: transparent;

  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;

  /* Normalize \`line-height\`. Cannot be changed from \`normal\` in Firefox 4+. */
  line-height: normal;

  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  /* Corrects inability to style clickable \`input\` types in iOS */
  -webkit-appearance: none;

  /* Remove excess padding and border in Firefox 4+ */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;

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
