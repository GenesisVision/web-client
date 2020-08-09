import * as React from "react";
import { FC } from "react";
import styled, {
  FlattenInterpolation,
  StyledComponent
} from "styled-components";
import { IStyleTable, parseStyles } from "utils/style/style-generators";

export interface WithStylesOptions {
  styleTable: IStyleTable;
  additionalStyles?: FlattenInterpolation<any>;
}

export const withStyles = <T extends { [k: string]: any }>({
  additionalStyles,
  styleTable
}: WithStylesOptions) => (
  Component: React.FC<T>
): StyledComponent<FC<T>, any> => {
  return styled(Component)`
    ${parseStyles({ styleTable })}
    ${additionalStyles}
  `;
};
