import * as React from "react";
import styled, { FlattenInterpolation } from "styled-components";
import { IStyleTable, parseStyles } from "utils/style/class-generators";

export interface WithStylesOptions {
  styleTable: IStyleTable;
  additionalStyles?: FlattenInterpolation<any>;
}

export const withStyles = ({
  additionalStyles,
  styleTable
}: WithStylesOptions) => (Component: React.FC) => {
  return styled(Component)`
    ${parseStyles({ styleTable })}
    ${additionalStyles}
  `;
};
