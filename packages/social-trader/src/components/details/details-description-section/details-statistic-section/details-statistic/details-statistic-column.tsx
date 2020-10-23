import React from "react";
import styled from "styled-components";
import {
  mediaBreakpointLandscapePhone,
  mediaBreakpointPhone
} from "utils/style/media";
import {
  $detailsStatisticSectionWidth,
  $paddingSmall
} from "utils/style/sizes";

export const DetailsStatisticColumn = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  ${mediaBreakpointPhone(`
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  `)}
  ${mediaBreakpointLandscapePhone(`
    flex-direction: column;
    width: auto;
    max-width: ${($detailsStatisticSectionWidth -
      $paddingSmall * 2 -
      $paddingSmall * 2) /
      2}px;
    justify-content: space-between;
  `)}
`;
