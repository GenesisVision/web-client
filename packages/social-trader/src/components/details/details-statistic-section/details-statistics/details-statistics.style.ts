import { DefaultBlock } from "components/default.block/default.block";
import { $textLightColor } from "components/gv-styles/gv-colors/gv-colors";
import { mediaBreakpointLandscapePhone } from "components/gv-styles/gv-media";
import {
  $detailsStatisticSectionWidth,
  $paddingXsmall
} from "components/gv-styles/gv-sizes";
import styled from "styled-components";

export const StyledDetailsStatisticsBlock = styled(DefaultBlock)`
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
