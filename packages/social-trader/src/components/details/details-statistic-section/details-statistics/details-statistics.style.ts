import { $textLightColor } from "components/gv-styles/gv-colors/gv-colors";
import { mediaBreakpointLandscapePhone } from "components/gv-styles/gv-media";
import {
  $detailsStatisticSectionWidth,
  $paddingXsmall
} from "components/gv-styles/gv-sizes";
import { css } from "styled-components";

export const detailsStatisticsStyle = css`
  box-sizing: border-box;
  width: 100%;
  color: ${$textLightColor};

  margin-bottom: ${$paddingXsmall}px;
  &:not(:last-child) {
    ${mediaBreakpointLandscapePhone(`margin-right:${$paddingXsmall}px;`)}
  }
  ${mediaBreakpointLandscapePhone(
    `max-width: ${$detailsStatisticSectionWidth}px;`
  )}
`;
