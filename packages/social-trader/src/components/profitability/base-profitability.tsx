import {
  $labelColor,
  $negativeColor,
  $positiveColor
} from "components/gv-styles/gv-colors/gv-colors";
import { mediaBreakpointLandscapePhone } from "components/gv-styles/gv-media";
import { $fontSizeCommon } from "components/gv-styles/gv-sizes";
import * as React from "react";
import styled from "styled-components";

import { PROFITABILITY_VARIANT } from "./profitability.helper";

interface Props {
  children: JSX.Element | string;
  isPositive: boolean;
  isNegative: boolean;
  variant?: PROFITABILITY_VARIANT;
}

const BaseProfitability = styled.div<Props>`
  display: inline-block;
  color: ${({ isPositive, isNegative }) => {
    if (isPositive) return $positiveColor;
    if (isNegative) return $negativeColor;
  }};
  background-color: ${({ isPositive, isNegative }) => {
    if (isPositive) return `${$positiveColor}1a`;
    if (isNegative) return `${$negativeColor}1a`;
    return `${$labelColor}1a`;
  }};
  ${({ variant }) => {
    if (variant === PROFITABILITY_VARIANT.CHIPS)
      return `
        font-size: ${$fontSizeCommon / 1.5}px;
        font-weight: 600;
        border-radius: 19.5px;
        padding: 4px 10px;
        white-space: nowrap;
      
        ${mediaBreakpointLandscapePhone(`
          font-size: ${$fontSizeCommon}px;
          padding: 5px 13px;
        `)}
    `;
  }}
`;

export default BaseProfitability;
