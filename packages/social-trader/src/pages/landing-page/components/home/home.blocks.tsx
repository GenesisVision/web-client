import { landingContainerStyles } from "pages/landing-page/styles/landing-styles";
import React from "react";
import styled from "styled-components";
import {
  $landingBg,
  $landingBgGray,
  $mainColor,
  $rowColor
} from "utils/style/colors";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapeTablet,
  mediaBreakpointLargeDesktop,
  mediaBreakpointTablet
} from "utils/style/media";

import joinBg2 from "../../images/common/join-bg-2.svg";
import joinBgMob1 from "../../images/common/join-bg-mob-1.svg";

interface HomeSectionProps {
  id?: string;
  bgColor?: "gray" | "white";
  hasPadding?: boolean;
}

export const HomeContainer = styled.div<{ tall?: boolean }>`
  ${landingContainerStyles};
  ${({ tall }) =>
    tall &&
    `
      height: 100%;
      ${mediaBreakpointLandscapeTablet(`
        display: grid;
        grid-auto-flow: row;
      `)} 
  `};
`;

export const HomeSection = styled.section<HomeSectionProps>`
  background-color: ${({ bgColor }) => {
    switch (bgColor) {
      case "white":
        return $mainColor;
      case "gray":
        return $landingBgGray;
      default:
        return $landingBg;
    }
  }};
  color: ${({ bgColor }) => {
    switch (bgColor) {
      case "white":
      case "gray":
        return $rowColor;
      default:
        return $mainColor;
    }
  }};
  position: relative;
  ${({ hasPadding }) =>
    hasPadding &&
    `
      padding-top: 100px;
      padding-bottom: 100px;

      ${mediaBreakpointLargeDesktop(`
        padding-top: 140px;
        padding-bottom: 140px;
      `)}`}
`;

export const FirstScreenHomeSection = styled(HomeSection)<HomeSectionProps>`
  ${mediaBreakpointTablet(`
    min-height: 670px;
  `)};
  ${mediaBreakpointLandscapeTablet(`
    height: calc(100vh - 130px);
    min-height: 630px;
  `)};
  ${mediaBreakpointDesktop(`
    height: calc(100vh - 134px);
  `)};
  ${mediaBreakpointLargeDesktop(`
    min-height: 770px;
   `)};
`;

export const LastScreenHomeSection = styled(HomeSection)<HomeSectionProps>`
  padding-top: 360px;
  background-image: url(${joinBg2}), url(${joinBgMob1});
  background-repeat: no-repeat;
  background-size: 300px auto;
  background-position: 50% 50px, 50% 120px;

  ${mediaBreakpointTablet(`
        padding-top: 420px;
        background-size: 400px auto;
        background-position: 50% 70px, 50% 150px;
      `)};
  ${mediaBreakpointLandscapeTablet(`
        padding-top: 235px;
        padding-bottom: 235px;
        background-image: url(${joinBg2}),
          url(${joinBgMob1});
        background-size: auto;
        background-position: 90% 50%, 50% 50%;
      `)};
  ${mediaBreakpointDesktop(`
        padding-top: 260px;
        padding-bottom: 260px;
        background-size: auto;
        background-position: 80% 50%, 50% 50%;
      `)};
  ${mediaBreakpointLargeDesktop(`
        padding-top: 320px;
        padding-bottom: 320px;
        background-position: 70% 50%, 50% 50%;
      `)};
`;
