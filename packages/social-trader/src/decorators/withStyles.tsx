import * as React from "react";
import { FC } from "react";
import styled, {
  FlattenInterpolation,
  StyledComponent
} from "styled-components";
import { IStyleTable, parseStyles } from "utils/style/generators";

export interface WithStylesOptions {
  staticStyles?: IStyleTable;
  dynamicStyles?: FlattenInterpolation<any>;
}

export const withStyles = <T extends { [k: string]: any }>({
  dynamicStyles,
  staticStyles
}: WithStylesOptions) => (
  Component: React.FC<T>
): StyledComponent<FC<T>, any> => {
  return styled(Component)`
    ${staticStyles && parseStyles({ styleTable: staticStyles })}
    ${dynamicStyles}
  `;
};
