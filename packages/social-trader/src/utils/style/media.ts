import {
  DESKTOP,
  LARGE_DESKTOP,
  PHONE,
  PHONE_LANDSCAPE,
  TABLET,
  TABLET_LANDSCAPE
} from "utils/breakpoints";

const createMediaQueryCSS = (content: string, breakpoint: number) => `
  @media (min-width: ${breakpoint}px) {
    ${content}
  }
`;

export const mediaBreakpointPhone = (content: string) => {
  return createMediaQueryCSS(content, PHONE);
};

export const mediaBreakpointLandscapePhone = (content: string) => {
  return createMediaQueryCSS(content, PHONE_LANDSCAPE);
};

export const mediaBreakpointTablet = (content: string) => {
  return createMediaQueryCSS(content, TABLET);
};

export const mediaBreakpointLandscapeTablet = (content: string) => {
  return createMediaQueryCSS(content, TABLET_LANDSCAPE);
};

export const mediaBreakpointDesktop = (content: string) => {
  return createMediaQueryCSS(content, DESKTOP);
};

export const mediaBreakpointLargeDesktop = (content: string) => {
  return createMediaQueryCSS(content, LARGE_DESKTOP);
};
