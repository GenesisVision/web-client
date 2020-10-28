import React from "react";
import { css } from "styled-components";
import {
  $backgroundColor,
  $primaryColor,
  $textDarkColor,
  $textLightColor
} from "utils/style/colors";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapeTablet,
  mediaBreakpointLargeDesktop,
  mediaBreakpointTablet
} from "utils/style/media";
import { adaptivePadding, fontSize } from "utils/style/mixins";
import {
  $fontSizeCommon,
  $fontSizeH1,
  $fontSizeH2,
  $fontSizeH3,
  $fontSizeH4,
  $fontSizeParagraph,
  $paddingXxsmall
} from "utils/style/sizes";

export const RootStyle = css`
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body {
    color: white;
    background-color: ${$backgroundColor};
    font-family: "Montserrat", sans-serif;
    backface-visibility: hidden;
  }
  .body--fixed {
    overflow: hidden;
  }

  div {
    box-sizing: border-box;
  }

  input,
  textarea,
  select,
  button {
    font-family: "Montserrat", sans-serif;
  }

  a {
    color: ${$primaryColor};
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }

  #__next {
    height: 100%;
    color: white;
  }

  svg.recharts-surface {
    // fix for recharts
    overflow: visible;
  }

  h1 {
    ${fontSize($fontSizeH1)};
    font-weight: 600;
    color: ${$textLightColor};
    margin-top: 0;
    margin-bottom: 0;
  }

  h2 {
    ${fontSize($fontSizeH2)};
    font-weight: 600;
    color: ${$textLightColor};
    margin-top: 0;
    margin-bottom: 0;
  }

  h3 {
    ${fontSize($fontSizeH3)};
    font-weight: 600;
    color: ${$textLightColor};
    margin-top: 0;
    margin-bottom: 0;
    letter-spacing: 0.2px;
  }

  h4 {
    ${fontSize($fontSizeH4)};
    font-weight: 800;
    margin-top: 0;
    margin-bottom: 0;
  }

  h5 {
    margin: 0;
    ${fontSize($fontSizeCommon)};
  }

  p {
    ${fontSize($fontSizeParagraph)};
    ${adaptivePadding("bottom", $paddingXxsmall)};
    margin-top: 0;
    margin-bottom: 0;
  }

  :root {
    --scroll-width: 6px;
    --scroll-radius: calc(var(--scroll-width) / 2);
    --scroll-background: transparent;
    --scroll-thumb-color: ${$textDarkColor};
  }
  ::-webkit-scrollbar {
    width: var(--scroll-width);
    height: var(--scroll-width);
  }

  ::-webkit-scrollbar-track {
    background: var(--scroll-background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--scroll-thumb-color);
    border-radius: var(--scroll-radius);
  }

  ::-webkit-scrollbar-corner {
    background: var(--scroll-background);
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: var(--scroll-thumb-color) var(--scroll-background);
  }
`;

export const LandingPageRootStyle = css`
  a,
  label {
    -webkit-tap-highlight-color: transparent;
  }

  p {
    font-size: 13px;
    line-height: 1.6;
    padding-bottom: 0;

    ${mediaBreakpointTablet(`font-size: 18px;`)}
    ${mediaBreakpointLandscapeTablet(`font-size: 14px;`)};
    ${mediaBreakpointDesktop(`font-size: 16px;`)};
    ${mediaBreakpointLargeDesktop(`font-size: 18px;`)};
  }

  h1 {
    font-weight: 800;
    font-size: 28px;
    line-height: 1.6;
    padding-bottom: 0;
    margin-bottom: 16px;

    ${mediaBreakpointTablet(`font-size: 38px;`)};
    ${mediaBreakpointLandscapeTablet(`font-size: 26px;`)};
    ${mediaBreakpointDesktop(`font-size: 30px;`)};
    ${mediaBreakpointLargeDesktop(`font-size: 38px;`)};
  }

  h1,
  h2,
  h3 {
    color: inherit;
  }

  h2 {
    font-weight: 600;
    font-size: 28px;
    line-height: 1.6;
    padding-bottom: 0;
    margin-bottom: 16px;

    ${mediaBreakpointTablet(`font-size: 38px;`)};
    ${mediaBreakpointLandscapeTablet(`font-size: 26px;`)};
    ${mediaBreakpointDesktop(`font-size: 30px;`)};
    ${mediaBreakpointLargeDesktop(`font-size: 38px;`)};
  }

  h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    padding-bottom: 0;

    ${mediaBreakpointTablet(`font-size: 24px;
        line-height: 40px;`)};
    ${mediaBreakpointLandscapeTablet(`font-size: 20px;
        line-height: 32px;`)};
    ${mediaBreakpointLargeDesktop(`font-size: 22px;`)};
  }
`;
