import { IStyleValue } from "utils/style/style-generators";

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

export const horizontalPaddings = (value: IStyleValue | string) => {
  return {
    "padding-left": value,
    "padding-right": value
  };
};

export const verticalPaddings = (value: IStyleValue | string) => {
  return {
    "padding-left": value,
    "padding-right": value
  };
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
