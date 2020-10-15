import React from "react";
import styled from "styled-components";
import { $textAccentColor } from "utils/style/colors";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { $fontSizeH4, $fontSizeH4Mobile } from "utils/style/sizes";

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
