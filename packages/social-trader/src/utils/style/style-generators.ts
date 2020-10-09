import {
  css,
  FlattenInterpolation,
  FlattenSimpleInterpolation
} from "styled-components";
import { AnyObjectType } from "utils/types";

export interface IStyleValue<T = any> {
  value: T;
  unit?: string;
}

export type IStyleTable = {
  [keys: string]: IStyleValue | string;
};

export interface IBEMStyles {
  blockName: string;
  blockStyle: IStyleTable;
  children?: {
    [keys: string]: IStyleTable;
  };
}

export type GetPropsStylesFuncOutputType = (
  props: AnyObjectType
) => FlattenSimpleInterpolation;

export type GetPropsStylesFuncType = (
  field: string,
  callback: (props: AnyObjectType) => string
) => GetPropsStylesFuncOutputType;

export const getHEXA = (color: string, alpha: number): string => {
  const alphaInHEX = (alpha * 255 + 0x10000).toString(16).substr(-2);
  return color + alphaInHEX;
};

export const getPropsStyles: GetPropsStylesFuncType = (
  field: string,
  callback: (props: AnyObjectType) => string
) => (props: any) =>
  css`
    ${field}: ${callback(props)};
  `;

export const generateAdditionalStyles = (
  styles: AnyObjectType
): FlattenInterpolation<any> => {
  const lines = Object.entries(styles)
    .map(
      ([name, callback]) =>
        css`
          ${name}: ${callback};
        `
    )
    .join("");
  return css`
    ${lines}
  `;
};

export const parseStyles = ({
  styleTable
}: {
  styleTable: IStyleTable;
}): string => {
  return (
    Object.entries(styleTable)
      .map(([name, value]) => {
        const normalValue = (typeof value === "string"
          ? { value }
          : value) as IStyleValue;
        return [name, normalValue];
      })
      // @ts-ignore
      .map(([name, { value, unit = "" }]) => {
        return `${name}: ${value}${unit}; 
      `;
      })
      .join("")
  );
};

export const generateClass = ({
  styleTable,
  className
}: {
  styleTable: IStyleTable;
  className: string;
}): string => {
  const parsedStyles = parseStyles({ styleTable });
  return `.${className} {
    ${parsedStyles}
  };
  `;
};

export const generateBEMStyles = ({
  blockName,
  blockStyle,
  children = {}
}: IBEMStyles): string => {
  const blockClass = generateClass({
    className: blockName,
    styleTable: blockStyle
  });
  const childrenClasses = Object.entries(children)
    .map(([name, styleTable]) => {
      return generateClass({ className: `${blockName}${name}`, styleTable });
    })
    .join("");
  return blockClass + childrenClasses;
};
