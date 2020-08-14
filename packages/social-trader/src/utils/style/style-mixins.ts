import {
  mediaBreakpointLandscapePhone,
  mediaBreakpointLandscapeTablet
} from "components/gv-styles/gv-media";
import { $dividerPadding, $dividerText } from "components/gv-styles/gv-sizes";
import { css } from "styled-components";
import { IStyleValue } from "utils/style/style-generators";
import { AnyObjectType } from "utils/types";

export const adaptiveBorderRadius = (size: number) => {
  return `
    border-radius: ${size / $dividerText}px;
    ${mediaBreakpointLandscapePhone(`border-radius: ${size}px;`)}`;
};

export const cursorPointer = css`
  ${({ onClick }: AnyObjectType) => onClick && "cursor: pointer"};
`;

export const hideOnLandscapeTablet = (display: string = "block") => {
  return `
    display: none;
    ${mediaBreakpointLandscapeTablet(`display: ${display};`)}
  `;
};

export const adaptivePadding = (direction: string, marginSize: number) => {
  return `
    padding-${direction}: ${marginSize / $dividerPadding}px;
    ${mediaBreakpointLandscapePhone(`padding-${direction}: ${marginSize}px;`)}
  `;
};

export const adaptiveMargin = (direction: string, marginSize: number) => {
  return `
    margin-${direction}: ${marginSize / $dividerPadding}px;
    ${mediaBreakpointLandscapePhone(`margin-${direction}: ${marginSize}px;`)}
  `;
};

export const width = (value: IStyleValue | string) => {
  return {
    width: value
  };
};

export const height = (value: IStyleValue | string) => {
  return {
    height: value
  };
};

export const fontSize = (value: IStyleValue | string) => {
  return {
    "font-size": value
  };
};

export const horizontalPaddings = (value: number) => {
  return `
    ${adaptivePadding("left", value)}
    ${adaptivePadding("right", value)}
  `;
};

export const verticalPaddings = (value: number) => {
  return `
    ${adaptivePadding("top", value)}
    ${adaptivePadding("bottom", value)}
  `;
};

export const getBoxShadowValue = (color: string) => {
  return `0 0.2em 0.5em 0 ${color}`;
};

export const boxShadow = (color: string) => {
  return { "box-shadow": getBoxShadowValue(color) };
};

export const transition = (...args: string[]) => {
  const props = args.join(", ");
  return {
    "transition-property": props,
    "transition-duration": "400ms",
    "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
    "transition-delay": "0s",
    "will-change": props
  };
};
