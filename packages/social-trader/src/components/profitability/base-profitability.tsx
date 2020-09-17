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
  ${({ variant, isPositive, isNegative }) => {
    if (variant === PROFITABILITY_VARIANT.CHIPS)
      return `
        background-color: ${
          isPositive
            ? `${$positiveColor}1a`
            : isNegative
            ? `${$negativeColor}1a`
            : `${$labelColor}1a`
        };
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
  }};
`;

export default BaseProfitability;
