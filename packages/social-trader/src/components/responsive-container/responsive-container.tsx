import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import {
  isDesktop,
  isPhone,
  isPhoneLandscape,
  isTablet,
  isTabletLandscape
} from "utils/breakpoints";

export type BreakpointType =
  | "large-desktop"
  | "desktop"
  | "landscape-tablet"
  | "tablet"
  | "landscape-phone"
  | "phone";

interface Props {
  enabledScreens: BreakpointType[];
}

const getBreakpoint = (width: number): BreakpointType => {
  if (isPhone(width)) return "phone";
  if (isPhoneLandscape(width)) return "landscape-phone";
  if (isTablet(width)) return "tablet";
  if (isTabletLandscape(width)) return "landscape-tablet";
  if (isDesktop(width)) return "desktop";
  return "large-desktop";
};

export const ResponsiveContainer: React.FC<Props> = ({
  enabledScreens,
  children
}) => {
  const [breakpoint, setBreakpoint] = useState<BreakpointType>("large-desktop");
  useEffect(() => {
    window.addEventListener(
      "resize",
      debounce(() => setBreakpoint(getBreakpoint(window.innerWidth)), 166)
    );
    setBreakpoint(getBreakpoint(window.innerWidth));
  }, []);
  return enabledScreens.includes(breakpoint) ? <>{children}</> : <></>;
};
