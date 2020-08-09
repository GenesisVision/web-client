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
