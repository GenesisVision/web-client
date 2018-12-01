const PHONE_LANDSCAPE = 576;
const TABLET = 768;
const TABLET_LANDSCAPE = 992;
const DESKTOP = 1200;
const LARGE_DESKTOP = 1920;

export const isPhone = width => width < PHONE_LANDSCAPE;
export const isPhoneLandscape = width => width < TABLET;
export const isTablet = width => width < TABLET_LANDSCAPE;
export const isTabletLandscape = width => width < DESKTOP;
export const isDesktop = width => width < LARGE_DESKTOP;
export const isLargeDesktop = width => width >= LARGE_DESKTOP;
