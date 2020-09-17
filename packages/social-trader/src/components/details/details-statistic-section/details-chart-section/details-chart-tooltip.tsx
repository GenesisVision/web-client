import { $textAccentColor } from "components/gv-styles/gv-colors/gv-colors";
import { mediaBreakpointLandscapePhone } from "components/gv-styles/gv-media";
import { $fontSizeH4, $fontSizeH4Mobile } from "components/gv-styles/gv-sizes";
import React from "react";
import styled from "styled-components";

export const DetailsChartTooltipStatistic = styled.div`
  padding: 5px 0;
`;

export const DetailsChartTooltipValue = styled.div`
  font-size: ${$fontSizeH4Mobile};
  font-weight: 600;
  letter-spacing: 0.3px;
  color: ${$textAccentColor};
  ${mediaBreakpointLandscapePhone(`font-size: ${$fontSizeH4};`)}
`;
